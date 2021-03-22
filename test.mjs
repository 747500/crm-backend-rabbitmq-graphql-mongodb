
import amqplib from 'amqplib'
import CONFIG from './config.mjs'

amqplib.connect(CONFIG.RabbitMQ.url)
.then(connection => {

	/*
	const query = {
		model: 'User',
		method: 'findOne',
		args: [
			{
				_id: '603d231a9a7451fe5bbc49b7'
			}
		]
	}
	*/

	const query = [
		`{ user(id: "603d231a9a7451fe5bbc49b7") {
			name
			notifyBirthdayAt
			notifyTelegramId
			ctime
			mtime
			version
		} }`,

		`{ users {
			id
			notifyTelegramId
			notifyBirthdayAt
		} }`
	]

	return connection.createChannel().then(channel => {

		return channel.assertQueue('', { exclusive: true }).then(q => {

			return [

				channel.consume(
					q.queue,
					message => {
						const { content, ...header } = message

						//console.log(header)
						console.dir(JSON.parse(content).data, { depth: 3 })

						//connection.close()

					},
					{
						noAck: true
					}
				),

				...query.map(query => channel.sendToQueue(
						CONFIG.RabbitMQ.queues['graphql'].name,
						Buffer.from(query),
						{
							contentType: 'text/plain',
							contentEncoding: 'utf8',
							timestamp: Date.now(),
							replyTo: q.queue
						}
					),

				)

			].reduce((accum, ok) => accum.then(ok), Promise.resolve())

		})
	})

})
.catch(err => {
	console.error('fatal:', err)
	process.exit(1)
})
