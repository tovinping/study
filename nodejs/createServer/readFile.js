const fs = require('fs');
module.exports = {
  readImg: (file, res)=>{
      res.writeHead(200, {'Content-Type': 'image/jpeg'})
      // 第一种方式
      var data = fs.readFileSync(file)
      res.write(data)
      res.end()
      //第二种方式(好像是可以断点续传)
      // var stream = fs.createReadStream(file)
      // var sData =[]
      // if (stream) {
      //   stream.on('data',function(chunk){
      //     sData.push(chunk);
      //   })
      //   stream.on('end',function(){
      //     var finalData = Buffer.concat(sData)
      //     res.write(finalData)
      //     res.end()
      //   })
      // }
      // 第三种
      // fs.readFile(file, function(err, data){
      //   if(err){
      //     console.log(err)
      //   } else {
      //     res.end(data)
      //   }
      // })
      // 第四种---失败了
      // fs.createReadStream(file).pip(res.write())
  }
}
