const sls = require('serverless-http')
const binaryMimeTypes = require('./binaryMimeTypes')
const nuxt = require('./nuxt-app')

module.exports.nuxt = (evt, ctx, callback) => {
	nuxt()
	.then(app =>
		sls(app, {
			binary: binaryMimeTypes,
			request: (request, event, context) => {
				console.log("request", request)
				console.log("event", event)
				console.log("context", context)
			},
			response: (response, event, context) => {
				console.log("response", response)
				console.log("event", event)
				console.log("context", context)
			}
		})
	)
	.then(proxy => proxy(evt, ctx, callback))
	.catch(err => console.error(err))
}