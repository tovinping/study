class Router {
  constructor(req, res){
    this.req = req
    this.res = res
  }
  send(data) {
    this.res.write(data)
    this.res.end()
  }
  '/'(){
    this.send('hello World')
  }
  '/404'(){
    this.send('404page')
  }
}
module.exports = Router