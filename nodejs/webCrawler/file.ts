import fs from 'fs'
import path from 'path'

const DOWNLOAD_DIR = 'download'
const CACHE_DIR = 'cache'
function getUriName(uri: string) {
  const [th, id] = uri.split('-')
  return `${th}-${id}-1-1.txt`
}
export function fileExist(filePath: string) {
  return fs.existsSync(filePath)
}
export function getDirNameByUri(uri: string) {
  const [th, id] = uri.split('-')
  return `${th}-${id}-1-1` || uri
}
export function getFileNameByUri(uri: string) {
  return uri.split('/').pop() || uri
}
export function getSavePath(categoryUri: string, resourceUri: string) {
  return path.resolve(DOWNLOAD_DIR, getDirNameByUri(categoryUri), getFileNameByUri(resourceUri))
}
export function saveBuffer(buffer: Buffer, filePath: string) {
  return new Promise(resolve => {
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error('SSS', err)
      }
      resolve(true)
    })
  })
}
export function createDataDir(uri: string) {
  const preDirExist = fs.existsSync(DOWNLOAD_DIR)
  if (!preDirExist){
    fs.mkdirSync(path.resolve(DOWNLOAD_DIR))
  }
  const dir = getDirNameByUri(uri)
  const dirPath = path.resolve(DOWNLOAD_DIR, dir)
  const dirExist = fs.existsSync(dirPath)
  if (!dirExist) {
    fs.mkdirSync(dirPath)
  }
}
export function saveWebContent(content: string, uri: string) {
  const fileName = getUriName(uri)
  const filePath = path.resolve(CACHE_DIR, fileName)
  fs.writeFileSync(filePath, content)
}
export function getWebContent(uri: string) {
  const fileName = getUriName(uri)
  const filePath = path.resolve(CACHE_DIR, fileName)
  try {
    const result = fs.readFileSync(filePath)
    console.log('从缓存获取=', uri)
    return result ? result.toString() : ''
  } catch (error: any) {
    console.error('从未下载过=', error.message)
    return ''  
  }
}