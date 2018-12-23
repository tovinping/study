var net = require('net')
var readline = require('readline')
var port = 9000
var host = '127.0.0.1'
var client = new net.Socket()
client.setEncoding = 'UTF-8'
client.connect(port, host, ()=>{
  client.write('上线了')
})
client.on('data', (data)=>{
  console.log(data.toString())
  sayMsg()
})
client.on ('error', (err)=>{
  console.log(err)
})
client.on('close', ()=>{
  console.log('client closed')
})
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function sayMsg(){
  r1.question('input:',(data)=>{
    if(data != 'bye') {
      client.write(data+'\n')
    } else {
      client.close()
    }
  })
}