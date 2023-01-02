class MyPromise {
  state = "pending";
  resolveCallbacks = [];
  rejectCallbacks = [];
  constructor(callback) {
    callback(this.resolve.bind(this), this.reject.bind(this));
  }
  resolve(result) {
    if (this.state !== "pending") return;
    this.state = "fullFilled";
    this.nextTick(() => {
      this.resolveCallbacks.forEach((fn) => fn(result));
    });
  }
  reject(reason) {
    if (this.state !== "pending") return;
    this.state = "rejected";
    this.nextTick(() => {
      this.rejectCallbacks.forEach((fn) => fn(reason));
    });
  }
  then(resolveCallback, rejectCallback) {
    this.resolveCallbacks.push(resolveCallback);
    if (rejectCallback) this.rejectCallbacks.push(rejectCallback);
    return this;
  }
  catch(callback) {
    this.rejectCallbacks.push(callback);
    return this;
  }
  nextTick(fn) {
    if (typeof process !== "undefined") {
      return process.nextTick(fn);
    } else {
      const observer = new MutationObserver(fn);
      const textNode = document.createTextNode("1");
      observer.observe(textNode, { characterData: true });
      textNode.data = "2";
    }
  }
  static all(arrPromise) {
    const ret = [];
    let len = 0;
    return new MyPromise((resolve, reject) => {
      arrPromise.forEach((p, idx) => {
        p.then(
          (r) => {
            len++;
            ret[idx] = r;
            if (len == arrPromise.length) {
              resolve(ret);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }
  static race(arrPromise) {
    return new MyPromise((resolve, reject) => {
      arrPromise.forEach((p, idx) => {
        p.then(r => {
          resolve(r)
        }, e => {
          reject(e)
        })
      })
    })
  }
}
function getData(d) {
  return new MyPromise((resolve, reject) => {
    const timer = Math.ceil(Math.random() * 1000);
    console.log('TT=', d, timer)
    setTimeout(() => {
      if (d === "c") {
        reject("ccc");
      }
      resolve(d + timer);
    }, timer);
  });
}
let i = 1;
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    if (i % 2 === 0) {
      resolve("TANGWENPING");
    } else {
      reject("TOVINPING");
    }
    i++;
  }, 500);
});
p.then(
  (result) => {
    console.log("RR=" + result);
  },
  (r) => {
    console.log("R0=", r);
  }
);
p.then((r) => {
  console.log("R1=", r);
});
p.then((r) => {
  console.log("R2=", r);
});
MyPromise.all([getData("a"), getData("b"), getData("c")])
  .then((arr) => {
    console.log("ALL1=", arr);
  }, err => {
    console.log('ALL0=', err)
  })
  .catch((err) => {
    console.log("ALL2=", err);
  });

  MyPromise.race([getData('A'), getData('B')]).then(r => {
    console.log('RACE=', r)
  })