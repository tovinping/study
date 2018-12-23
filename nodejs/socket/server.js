var net = require('net')
var clientMap = {}
var chatServer = net.createServer()
var i = 0 // 连接名称自增
chatServer.on('connection', (client)=>{
    client.name = ++i
    clientMap[client.name] = client

    client.on('data', (data)=>{
        data = data.toString()
        console.log(data)
        broadcast(data, client)
    })
    client.on('error', (err)=>{
        console.log(err)
        client.end()
    })
    client.on('close', (data)=>{
        data = data.toString()
        console.log(data)
        delete clientMap[client.name]
        broadcast(client.name+'下线啦', client)
    })
})

function broadcast (msg, client){
    for (let key in clientMap) {
        clientMap[key].write(client.name +'say:' +msg+'\n')
    }
}

chatServer.listen(9000)