const fastifyPlugin = require('fastify-plugin')
const weatherData = require('./v1/weather')

async function routesRegistration(fastify, options) {
  // page routes
  fastify.register(weatherData, { prefix: 'v1/' })  
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(routesRegistration)
