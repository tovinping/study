var http = require('http')
var url = require('url')
var router = require('./router')
http.createServer((req, res)=>{
    var path = url.parse(req.url).pathname
    if (path === '/favicon.ico') {
        res.end()
    } else {
        router[path]?router[path](req, res):router['/404'](req, res)
    }
}).listen(8000)