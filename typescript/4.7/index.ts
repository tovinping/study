import fs from 'fs'
import path from 'path'
let fileNameFlag = 0
function getDefaultPath () {
  return path.resolve(__dirname, './download')
}
function getDir(type: string) {
  const defaultPath = getDefaultPath()
  const dateDir = new Date().toLocaleDateString().replace(/\//g, '-')
  const fullDir = path.resolve(defaultPath, dateDir)
  if (type === 'date') {
    try {
      fs.statSync(fullDir) 
    } catch (error) {
      fs.mkdirSync(path.join(__dirname, `download/${dateDir}`))
      console.log('TANG===111', error);
    }finally{
      return fullDir
    }
  } else {
    return path.resolve(defaultPath, type)
  }
}
function getFilePah() {
  const dir = getDir('date')
  let name = 0
  if (fileNameFlag === 0) {
    const files = fs.readdirSync(dir)
    name = files.length
  } else {
    name = fileNameFlag
  }
  fileNameFlag++
  const fullPath = path.resolve(dir, name+'.png')
  return fullPath
}

async function downloadBlob(buf: ArrayBuffer) {
  const filePath = getFilePah();
  const buffer = Buffer.from(buf)
  fs.writeFileSync(filePath, buffer)
}

function downloadFile(url: string) {
  return fetch(url).then(async (response) => {
    const contentType = response.headers.get('Content-type')
    console.log('TANG==', contentType)
    if (contentType?.match(/image/)) {
      downloadBlob(await response.arrayBuffer())
    } else {
      return response.json()
    }
  })
}

downloadFile('https://img0.baidu.com/it/u=1501084209,93021381&fm=253&fmt=auto&app=138&f=JPEG')