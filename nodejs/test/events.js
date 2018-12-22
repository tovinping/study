const EventEmiter = require('events')
var palyer = new EventEmiter()

palyer.on('data',(data)=>{
    console.log(data)
})

setTimeout(() => {
    palyer.emit('data', {name: 'tovinping'})
}, 1000);