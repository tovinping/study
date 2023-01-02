var p = new Promise((r) => {
  console.log('A')
  r(1)
})
p.then(r => {console.log('B')})
Promise.resolve().then(() => console.log(2));
process.nextTick(() => console.log(1));
process.nextTick(() => console.log(3));
process.nextTick(() => Promise.resolve().then(() => console.log(9)))
Promise.resolve().then(() => console.log(4));
// 1// 3// 2// 4
