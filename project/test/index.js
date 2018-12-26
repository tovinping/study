const server = require('../twpsr')
const router = require('./router')
console.log(server)
server.init(8000)
setTimeout(()=>{
  server.initRouter(router)
}, 1000)