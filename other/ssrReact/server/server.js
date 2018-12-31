const express = require('express')
import React from 'react'
import {renderToString} from 'react-dom/server'
import App from '../src/App.js'
const fs = require('fs')
const path = require('path')

const app = express()
app.get('/', (req, res)=>{
  let html = fs.readFileSync(path.join(__dirname, '..', 'build/index.html'))
  let content = renderToString(<App />)
  res.send(html.toString().replace('<div id="root"></div>', `<div id="root">${content}</div>`))
})
app.use('/', express.static('build'))
app.listen(3001, ()=>{
  console.log('started on port: 3001')
})