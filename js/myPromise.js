class MyPromise {
  state = "pending";
  resolveCallbacks = [];
  rejectCallbacks = [];
  result = undefined;
  constructor(callback) {
    callback(this.resolve.bind(this), this.reject.bind(this));
  }
  resolve(result) {
    if (this.state !== "pending") return;
    this.state = "fullFilled";
    this.result = result;
    this.resolveCallbacks.forEach((fn) => fn(result));
  }
  reject(reason) {
    if (this.state !== "pending") return;
    this.state = "rejected";
    this.nextTick(() => {
      this.rejectCallbacks.forEach((fn) => fn(reason));
    });
  }
  then(resolveCallback, rejectCallback) {
    return new MyPromise((resolve, reject) => {
      if (this.state !== "pending") {
        resolve(this.result);
        resolveCallback(this.result);
      } else {
        this.resolveCallbacks.push((d) => {
          const x = resolveCallback(d);
          this.resolvePromise(x, resolve);
        });
      }
    });
  }
  catch(callback) {
    this.rejectCallbacks.push(callback);
    return this;
  }
  resolvePromise(x, resolve) {
    if (x === undefined) {
      resolve(x);
    } else if (typeof x.then === "function") {
      x.then((d) => this.resolvePromise(d, resolve));
    } else {
      resolve(x);
    }
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
        p.then(
          (r) => {
            resolve(r);
          },
          (e) => {
            reject(e);
          }
        );
      });
    });
  }
}
function getData(d) {
  return new MyPromise((resolve, reject) => {
    const timer = Math.ceil(Math.random() * 1000);
    setTimeout(() => {
      resolve(`${d}#${timer}`);
    }, timer);
  });
}
const pp = getData("Q");
pp.then((r) => {
  console.log("EEE=", r);
});
pp.then((r) => {
  console.log("E0=", r);
  return getData(r);
})
  .then((r) => {
    console.log("E1=", r);
    return getData(r);
  })
  .then((r) => {
    console.log("E2=", r);
  });
const p = new MyPromise((res) => res(1));
p.then((r) => {
  console.log("ddd", r);
});
