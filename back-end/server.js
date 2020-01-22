const isdevMode = (process.env.NODE_ENV === 'dev')

// Require the framework and instantiate it
const fastify = require('fastify')({
  pluginTimeout: 5000,
  logger: false
})

fastify.register(require('fastify-cors'), {})
fastify.register(require('fastify-compress'))
const helmet = require('fastify-helmet')

fastify.register(helmet)

// Declare health check endpoint
fastify.get('/health', function (request, reply) {
  const obj = {}
  obj.status = 'ok'  
  reply.send(obj)
})

// route registrations
fastify.register(require('./routes/index'))

fastify.setErrorHandler(function (error, request, reply) {
  if (error.validation) {
    reponsePayloadDefaultProps['statusCodeValue'] = 422
    reponsePayloadDefaultProps['error'] = 'validation'
    reponsePayloadDefaultProps['message'] = (error.validation[0] && error.validation[0]['message']) || 'missing data required by the api'
    reply.status(422).send(reponsePayloadDefaultProps)
  }
})

fastify.ready().then(() => {
  console.log(fastify.printRoutes())
}, (err) => {
  console.log('not ready', err)
})

// fastify.addHook('onRequest', (req, res, next) => {
//   req.console.log(`receive request`)
//   next()
// })

// fastify.addHook('preHandler', (request, reply, next) => {
//   request.console.log(`before request handler`)
//   // some code
//   next()
// })

// fastify.addHook('onSend', (request, reply, payload, next) => {
//   request.console.log(`before response send`)
//   next()
// })

// fastify.addHook('onResponse', (res, next) => {
//   res.console.log(`response sent`)
//   next()
// })

const portToRun = process.env.PORT || 3500

// clean up activity when server shuts down
fastify.addHook('onClose', (instance, done) => {
  // some code
  done()
})

const start = async () => {
  try {
    console.log(`listening on ${portToRun}`)
    await fastify.listen(portToRun, '::') // listen to all ipv4 / ipv6 addresses on specified port
  } catch (err) {
    process.exit(1)
  }
}

start()

// this function is called when you want the server to die gracefully
// i.e. wait for existing connections
const gracefulShutdown = function () {
  fastify.close()
  console.log('SIGTERM or SIGINT shutting down gracefully')

  // if after
  setTimeout(function () {
    process.exit(0)
  }, 5 * 1000)
}

// listen for TERM signal .e.g. kill
// process.on('SIGTERM', gracefulShutdown)

// listen for INT signal e.g. Ctrl-C
// process.on('SIGINT', gracefulShutdown)

// catches uncaught exceptions
process.on('uncaughtException', function (error) {
  switch (error.code) {
    case 'EACCES':
      console.log('EACCES uncaughtException')
      process.exit(1)
    case 'EADDRINUSE':
      console.log('EADDRINUSE uncaughtException')
      process.exit(1)
    default:
      console.log(`${error.code} uncaughtException`)
  }
  console.log(`generic uncaughtException`)
  console.log(error.stack)
})