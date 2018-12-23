var httpServer = require('http').createServer(handler)
var io = require('socket.io')(httpServer)
function handler(req, res){
  res.end('hello world')
}
io.on('connection',(socket)=>{
  console.log('sss')
  socket.emit('news', {hello: 'world'})
  socket.on('test', (data)=>{
    console.log(data)
  })
})
httpServer.listen(9000)
console.log('server running on port 9000')