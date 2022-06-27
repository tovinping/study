import fs from 'fs'
import path from 'path'

const DOWNLOAD_DIR = 'download'
const CACHE_DIR = 'cache'
function getUriName(uri: string) {
  if (uri.includes('.')) {
    return uri.split('.')[0] + '.txt'
  }
  return uri + '.txt'
}
export function fileExist(filePath: string) {
  return fs.existsSync(filePath)
}
export function getDirNameByUri(uri: string) {
  const dir = uri.split('/').pop()?.split('.')[0]
  return dir || uri
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
export function saveWebContent(content: string, name: string) {
  const fileName = getUriName(name)
  const filePath = path.resolve(CACHE_DIR, fileName)
  fs.writeFileSync(filePath, content)
}
export function getWebContent(name: string) {
  const fileName = getUriName(name)
  const filePath = path.resolve(CACHE_DIR, fileName)
  try {
    const result = fs.readFileSync(filePath)
    return result ? result.toString() : ''
  } catch (error: any) {
    console.error('error', error.toString())
    return ''  
  }
}