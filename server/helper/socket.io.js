let io = null
module.exports = {
	init (server) {
		io = require('socket.io')(server)
	},
	io () {
		if (io) {
			return io
		}

		console.log('socket.io must be initialized first')
	}
}