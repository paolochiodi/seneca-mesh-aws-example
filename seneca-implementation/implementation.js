'use strict'

const Seneca = require('seneca')

const seneca = Seneca()

.add({cmd: 'test', action: 'hello'}, function (msg, done) {
  done(null, {answer: 'world!'})
})

seneca.use('mesh-aws', {
  aws: {region: 'eu-central-1'},
  pin: 'cmd:test'
})


seneca.ready(function () {
  console.log('Seneca up and running')
})