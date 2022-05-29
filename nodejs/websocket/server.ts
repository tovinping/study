import net from "net";
import {EventEmitter} from 'events'
import crypto from 'crypto'
interface IOptions {
  port: number;
  captureRejections?: boolean
}
function headers2Map(headerString: string) {
  const rows = headerString.split('\r\n').slice(1, -2)
  const map = new Map<string, string>()
  rows.forEach(item => {
    const [key, value] = item.split(':')
    map.set(key, value)
  })
  return map
}
function toAcceptKey(wsKey: string) {
  const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
  return crypto.createHash('sha1').update(wsKey+CODE).digest('base64')
}
class SocketServer extends EventEmitter {
  private options: IOptions;
  private server: net.Server;
  constructor(options: IOptions) {
    super(options)
    this.options = options;
    this.server = net.createServer(this.listener);
    this.server.listen(this.options.port, () => {
      console.log("server running", this.options.port);
    });
  }
  listener = (socket: net.Socket) => {
    socket.setKeepAlive(true)
    socket.on("data", (chunk) => {
      // 升级协议
      const chunkString = chunk.toString();
      console.log('data=', chunkString)
      if (chunkString.match(/Upgrade: websocket/)) {
        this.upgrade(socket, chunkString);
      }
    });
    this.emit('connection', socket)
  };
  upgrade = (socket: net.Socket, data: string) => {
    const headersMap = headers2Map(data)
    const websocketKey = headersMap.get('Sec-WebSocket-Key')
    const acceptKey = toAcceptKey(websocketKey!)
    console.log('key=', websocketKey);
    const response = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${acceptKey}`,
      'testHeader: myWs',
      '\r\n'
    ].join('\r\n')
    console.log('response=', response);
    socket.write(response)
  };
}
new SocketServer({ port: 9000 });
console.log("start");
