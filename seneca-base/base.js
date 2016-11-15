'use strict'

const Seneca = require('seneca')

const seneca = Seneca()

seneca.use('mesh-aws', {
  aws: {region: 'eu-central-1'},
  base: true,
  pin: 'cmd:test',
})

seneca.ready(function () {
  console.log('Seneca up and running')
})