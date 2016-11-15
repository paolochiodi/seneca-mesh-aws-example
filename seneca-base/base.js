'use strict'

const Seneca = require('seneca')

const seneca = Seneca()

.add({cmd: 'test', action: 'hello'}, function (msg, done) {
  done(null, {answer: 'world!'})
})

seneca.ready(function () {
  seneca.use('mesh', {
    port: 39000,
    base: true,
    pin: 'cmd:test'
  })

  console.log('Seneca up and running')
})