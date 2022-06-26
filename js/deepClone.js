function deepClone(source) {
  const targetObj = source.constructor === Array ? [] : {}
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const element = source[key];
      if (element && typeof element === 'object') {
        targetObj[key] = deepClone(element)
      } else {
        targetObj[key] = element
      }
    }
  }
  return targetObj
}
var s1 = {name: '1', o: {name: '11', age: 22}, fn: () => '111', d: new Date(), s: new Set(), m: new Map()}
var s2 = deepClone(s1)
// console.log('SSS=', s1, s2);

function myNew(fn, ...args) {
  const obj = {}
  obj.__proto__ = fn.prototype
  const result = fn.apply(obj, args)
  return typeof result === 'object' ? result : obj
}

function myInstance(left, right) {
  const proto = left.__proto__
  const prototype = right.prototype
  if (!proto) return false
  if (proto === prototype) return true
  return myInstance(proto, right)
}
Function.prototype.myCall = function(obj, ...rest){
  const s = Symbol('')
  obj[s] = this;
  const result = obj[s](...rest)
  delete obj[s]
  return result
}

function Person(name, age) {
  this.name = name
  this.age = age
  this.getInfo = function() {
    return `name:${this.name};age:${this.age}`
  }
}

const p = myNew(Person, 'tangwenping', 33)
// console.log('QQQ', p, p.getInfo(), p instanceof Person, myInstance(p, Person))
function testFn() {
  console.log('testFn=', this.name)
}
testFn.myCall({name: 'aaaaa'})
testFn()