const Server = require('./father')
class Child extends Server{
  constructor(props){
    super(props)
  }
  say(){
    console.log(this)
  }
}

var ch = new Child()
ch.say()