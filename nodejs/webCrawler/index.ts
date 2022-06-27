import * as cheerio from 'cheerio'
import config from './config.json' assert { type: "json" }
import { downloadFile } from './download.js'
import { createDataDir, fileExist, getSavePath, getWebContent, saveWebContent } from './file.js'
function requestWebContent(uri: string) {
  const url = config.domain + uri
  console.log('requestWebContent=', url)
  return fetch(url).then(res => res.text())
}
async function getContent(uri: string) {
  return getWebContent(uri) || requestWebContent(uri)
}
async function listContent(uri: string) {
  const webContent = await getContent(uri)
  saveWebContent(webContent, uri)
  const $ = cheerio.load(webContent)
  const domList = $('tbody th em')
  const dataList: Array<{title: string; uri: string}> = []
  const skipFlag: Array<{title: string; uri: string}> = []
  domList.each(function(){
    const flag = $(this).text().replace(/[\[\]]/g, '')
    const inKeyWords = config.keyWords.includes(flag)
    const uri = $(this).next().attr('href') || ''
    const title = $(this).next().text()
    if (flag && inKeyWords && uri) {
      dataList.push({title, uri})
    } else {
      skipFlag.push({title, uri})
    }
  })
  console.log('skip data=', skipFlag.length)
  return dataList
}

async function detailContent(uri: string) {
  const webContent = await getContent(uri)
  saveWebContent(webContent, uri)
  saveWebContent(webContent, uri)
  const $ = cheerio.load(webContent)
  const domList = $('tbody img')
  const imgUrlList: string[] = []
  domList.each(function() {
    const imgUrl = $(this).attr('zoomfile')
    imgUrl && imgUrlList.push(imgUrl)
  })
  const webTitle = $('#thread_subject').text()
  console.log(`${webTitle} >>> 共发现${imgUrlList.length}张图片, url=${config.domain}${uri}`);
  if (!imgUrlList.length) {
    return
  }
  createDataDir(uri)
  let i = 1;
  for (const imgUrl of imgUrlList) {
    const savePath = getSavePath(uri, imgUrl)
    if (!savePath) {
      console.error('图片路径获取失败', imgUrl);
      i++
      continue
    }
    const isExist = fileExist(savePath)
    if (isExist) {
      console.log(`第${i}张图已经存在`);
      i++
      continue;
    }
    console.log(`开始下载第${i}张图片`);
    await downloadFile(imgUrl, savePath)
    i++
  }
  console.log(`#####################   ${uri}下所有图片下载完成   ############################`);
}
async function main() {
  const list = await listContent(config.uri)
  console.log('LIST = ', list.length);
  for (const item of list) {
    await detailContent(item.uri)
  }
}
main()