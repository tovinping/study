var fs = require('fs')
var path = require('path')
const Server = require('../index')
class Router extends Server {
  constructor(props){
    super(props)
  }
  send(data){
    this.res.write(data)
    this.res.end()
  }
  '/'(){
    fs.readFile(path.resolve(__dirname, '../views/index.html'),(err, data)=>{
      if(err) throw err;
      this.send(data)
    })
  }
  '/404'(){
    fs.readFile(path.resolve(__dirname, '../views/404.html'), (err, data)=>{
      if (err) throw err;
      this.send(data)
    })
  }
}
module.exports = Router