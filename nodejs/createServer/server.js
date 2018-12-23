const http = require('http');
const url = require('url');
const router = require('./router');
http.createServer((req, res)=>{
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
  if (req.url !== '/favicon.ico') {
    let path = url.parse(req.url).pathname
    try {
      router[path](req, res)
    } catch (e) {
      console.log(e)
      router['/404'](req, res)
    } finally {
        console.log('what happend?')
    }
  }
}).listen(8000)
