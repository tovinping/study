import * as cheerio from 'cheerio'
import config from './config.json' assert { type: "json" }
import { downloadFile, optimizationDownload } from './download.js'
import { createDataDir, fileExist, getSavePath, getWebContent, saveWebContent } from './file.js'
function requestWebContent(uri: string) {
  const url = config.domain + uri
  console.log('requestWebContent=', url)
  return fetch(url).then(res => res.text())
}
async function autoGetDetailContent(uri: string) {
  const webContent = getWebContent(uri) || await requestWebContent(uri)
  saveWebContent(webContent, uri)
  return webContent;
}
async function getPageDataList(uri: string) {
  const webContent = await requestWebContent(uri)
  const $ = cheerio.load(webContent)
  const domList = $('tbody th em')
  const dataList: Array<{title: string; uri: string}> = []
  const skipFlag: Array<{title: string; uri: string}> = []
  domList.each(function(){
    const flag = $(this).text().replace(/[\[\]]/g, '');
    const include = config.include.includes(flag);
    const uri = $(this).next().attr('href') || '';
    const title = $(this).next().text().toUpperCase();
    const exclude = config.exclude.some(item => title.includes(item));
    if (flag && include && uri && !exclude) {
      dataList.push({title, uri})
    } else {
      skipFlag.push({title, uri})
    }
  })
  console.log('skip length=', skipFlag.length, 'download length=', dataList.length)
  return dataList
}

async function detailContent(uri: string, title: string) {
  const webContent = await autoGetDetailContent(uri)
  const $ = cheerio.load(webContent)
  const domList = $('tbody img')
  const imgUrlList: string[] = []
  domList.each(function() {
    const imgUrl = $(this).attr('zoomfile')
    imgUrl && imgUrlList.push(imgUrl)
  })
  const webTitle = $('#thread_subject').text()
  if (imgUrlList.length) {
    console.log(`${imgUrlList.length}张图片 >>> title= ${webTitle} >>> url=${config.domain}${uri}`);
  } else {
    console.log(`<<<<< 0张图片 >>> title= ${title} >>> url= ${config.domain}${uri}`)
    return;
  }
  createDataDir(uri)
  let count = 0
  for (const imgUrl of imgUrlList) {
    const savePath = getSavePath(uri, imgUrl)
    if (!savePath) {
      console.error('---------------------------图片路径获取失败', imgUrl);
      continue
    }
    const isExist = fileExist(savePath)
    if (isExist) {
      continue;
    }
    optimizationDownload(imgUrl, savePath).then(() => {
      ++count
      console.log(`url=${config.domain}${uri} ${count}/${imgUrlList.length}`)
      if (count === imgUrlList.length) {
        console.log(`${webTitle} url=${config.domain}${uri} >>>>>下载完成<<<<<`)
      }
    })
  }
}
async function main() {
  const list = await getPageDataList(config.uri)
  for (const item of list) {
    detailContent(item.uri, item.title)
  }
}
main()