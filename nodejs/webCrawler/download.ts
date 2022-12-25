import { saveBuffer } from "./file.js"
async function downloadResponse(response: Response, savePath: string) {
  response.arrayBuffer().then(buffer => {
    return saveBuffer(Buffer.from(buffer), savePath)
  })
}
//ReadableStream
export function downloadFile(url: string, savePath: string) {
  return fetch(url).then(async (response) => {
    const contentType = response.headers.get('Content-type')
    if (contentType?.match(/image/)) {
      return downloadResponse(response, savePath)
    } else {
      return response.json()
    }
  })
}
const queue: Array<{url: string; savePath: string; resolve: (data: any) => void}> = []
let doingSize = 0
export async function optimizationDownload(url: string, savePath: string) {
  if (doingSize > 5) {
    return new Promise<any>(resolve => {
      queue.push({url, savePath, resolve})
    })
  } else {
    doingSize++
    return downloadFile(url, savePath).then(result => {
      doingSize--
      const data = queue.pop()
      if (!data) return result;
      optimizationDownload(data.url, data.savePath).then(data.resolve)
      return result
    })
  }

  // requestMap.set(url, true)
  // if (requestMap.size < 5) {
    
  // } else {
    
  // }
  // requestMap.delete(url)

}