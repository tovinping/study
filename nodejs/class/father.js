class Server {
  constructor() {
    this.res = null
    this.req == null
  }
  init(){
    this.res = {name: 'server'}
    this.req = {year: 2018}
  }
}
module.exports = Server