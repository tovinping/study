var file = require('./file')
var url = require('url')
var queryString = require('querystring')
module.exports={
    '/404'(req, res){
        res.end('404')
    },
    '/login'(req, res){
        // var params = url.parse(req.url, true).query
        // console.log(params)
        var data = ''
        req.on('data',(chunk)=>{
            data += chunk
        })
        req.on('end',()=>{
            file.postData(req, res, './login.html', data)
        })
    },
    '/register'(req, res){
        res.write('register')
        res.end()
    },
    '/images'(req, res){
        file.sendimg('./test.jpg', req, res)
    },
    '/imgtxt'(req, res){
        file.readfile('./imgtext.html', req, res)
    },
    '/getData'(req, res){
        var params = url.parse(req.url, true).query
        console.log(params)
        res.write(JSON.stringify(params))
        res.end()
    },
    '/postData'(req, res){

    }
}