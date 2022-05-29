var Ws = require('ws').Server
var server = new Ws({port: 9000})
var clientMap = {}
var i = 0
server.on('connection',(ws)=>{
  console.log('on connection', ws)
  ws.name = ++i;
  clientMap[ws.name] = ws
  ws.on('message',(msg)=>{
    sendAll(msg, ws)
  })
  ws.on('close',()=>{
    console.log('close')
  })
})
function sendAll(msg, ws){
  for(let key in clientMap){
    clientMap[key].send(`${ws.name}say:${msg}`)
  }
}