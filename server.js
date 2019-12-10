'use strict'

const express = require('express')
const proxy = require('redbird')({ port: 80, bunyan: false })
const port = process.env.PORT || 3000

const app = express()

app.use(express.static('public'))
app.use(express.static('dist'))

app.all('/collect', (req, res) => {
  console.log(req.query) // print tracking information
  res.sendFile(__dirname + '/pixel.gif')
})

app.listen(3000, () => console.log('Server is running on port', port))

proxy.register('website.test', 'http://127.0.0.1:3000')
proxy.register('static.test', 'http://127.0.0.1:3000')
proxy.register('tracker.test', 'http://127.0.0.1:3000')
