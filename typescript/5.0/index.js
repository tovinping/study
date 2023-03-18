var testName = 'dog'
switch (testName) {
  case 'dog':
    console.log('Dog')
  case 'cat':
    console.log('Cat')
  default:
    console.log('Default')
    break;
}
globalThis.name = 'tovinping'
class Man {
  constructor(name) {
    this.name = name
  }
  say() {
    console.log('say=', this.name)
  }
}
Man.prototype.say = () => {
  console.log('proto=', this.name)
}
var man = new Man('abc')
man.say()