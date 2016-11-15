'use strict'
const Seneca = require('seneca')
const seneca = Seneca()

seneca.ready(function () {

  seneca.use('mesh-aws', {
    aws: {region: 'eu-central-1'}
  })

  const Hapi = require('hapi')

  const server = new Hapi.Server()
  server.connection({
    port: 3000
  })

  server.start((err) => {
    if(err) {
      throw err
    }
    console.log('server running at port 3000')
  })
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      seneca.act({cmd: 'test', action: 'hello'}, function (err, response) {
        if (err) {
          return reply(err)
        }
        reply(response)
      })
    }
  })

})
