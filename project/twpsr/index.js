const http = require('http');
const url = require('url');
const Router = require('./router')
class Server {
  constructor(port){
    this.port = port
    this.res = null
    this.req = null
    this.router = null
    this.Rt = null
  }
  initRouter(Rt){
    this.Rt = Rt
  }
  init(port){
    var test = http.createServer((req, res)=>{
      console.log(req)
      this.req = req
      this.res = res
      let path = url.parse(req.url).pathname
      if (path !== '/favicon.ico') {
        !this.router && new Router()
        this.router[path] ? this.router[path]() : this.router['/404']()
      } else {
        res.end()
      }
    }).listen(port||this.port)
    console.log(test)
  }
}
module.exports = new Server(80)