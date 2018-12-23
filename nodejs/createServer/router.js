const readFile = require('./readFile');
const url = require('url')
module.exports ={
  '/': (req, res)=>{
    res.write('首页')
  },
  '/login': (req, res)=>{
    res.write('登陆页面')
  },
  '/register': (req, res)=>{
    res.write('注册页面')
  },
  '/404': (req, res)=>{
    res.write('页面君去火星了～～')
  },
  '/sendImg': (req, res)=>{
    readFile.readImg('b.jpg', res)
  },
  '/getParams': (req, res)=>{
    var query = url.parse(req.url, true).query
    res.end(JSON.stringify(query))
  }
}
