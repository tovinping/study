var fs = require('fs')
var queryString = require('querystring')
module.exports = {
  'readfile'(file, req, res){
    fs.readFile(file, (err, data)=>{
      if (err) throw err;
      res.write(data)
      res.end()
    })
  },
  'postData'(req, res, file, post){
    fs.readFile(file, (err, data)=>{
      data = data.toString()
      if (err) throw err;
      let obj = queryString.parse(post)
      console.log(obj)
      var arr = ['email', 'password']
      arr.forEach((val)=>{
        console.log(val)
        data = data.replace('{'+val+'}', obj[val])
      })
      res.write(data)
      res.end()
    })
  },
  'sendimg'(file, req, res){
    fs.readFile(file, (err, data)=>{
      if (err) throw err;
      res.write(data)
      res.end()
    })
  }
}