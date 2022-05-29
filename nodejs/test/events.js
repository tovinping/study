const EventEmitter = require('events')
var player = new EventEmitter()

player.on('data',(data)=>{
    console.log(data)
})

setTimeout(() => {
    player.emit('data', {name: 'tovinping'})
}, 1000);
