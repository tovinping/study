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
