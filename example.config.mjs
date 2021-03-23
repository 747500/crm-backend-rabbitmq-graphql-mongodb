
export default {

	RabbitMQ: {

		url: 'amqp://127.0.0.1',

		queues: {

			update: {
				name: 'crm-update',
				properties: {
					durable: true,
					exclusive: false,
				}
			},

			query: {
				name: 'crm-query',
				properties: {
					durable: true,
					exclusive: false,
				}
			},

			graphql: {
				name: 'crm-graphql',
				properties: {
					durable: true,
					exclusive: false,
				}
			},

		}
	},

	MongoDB: {
		URI: 'mongodb://127.0.0.1:27017/crm',
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true
		},
	}
}
