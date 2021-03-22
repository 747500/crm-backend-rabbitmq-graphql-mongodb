
import model from './model/index.mjs'

import Services from './services/index.mjs'

import { graphql, buildSchema } from 'graphql'
import { fieldsList, fieldsMap } from 'graphql-fields-list'

const schema = buildSchema(`

	type User {
		id: ID!,
		name: String!,
		notifyBirthdayAt: String,
		notifyTelegramId: String,
		version: String,
		ctime: String!,
		mtime: String
	},

	type Query {
		user(id: ID!): User,
		users: [User]
	}

`)

const root = {
	user ({ id }, context, info) {
		const fields = fieldsList(info, {
			transform: {
				version: '__v',
				id: '_id',
			}
		})
		console.log(fields)
		return model.User.findOne({ _id: id }).select(fields)
	},

	users (args, context, info) {
		const fields = fieldsList(info, {
			transform: {
				version: '__v',
				id: '_id',
			}
		})
		console.log(fields)
		return model.User.find().select(fields)
	},

}

Services.Run()
.then(services => {

	return [

		services.amqp.onMessage('graphql',
			(message, ack) => {

				const { content, ...header } = message

				//console.log(header)
				console.log(content.toString())

				graphql(schema, content.toString(), root).then(result => {

					//console.log(result)

					return services.amqp.replyOn(
						message,
						JSON.stringify(result)
					)

				})
				.catch(err => {
					console.error('! error:', err)
				})
				.finally(() => {
					ack()
				})

			}
		),

		services.amqp.onMessage('query',
			(message, ack) => {

				//console.log('*', message)

				services.mongodb.query(
					JSON.parse(message.content)
				)
				.then(result => {

					//console.log(result)

					return services.amqp.replyOn(
						message,
						JSON.stringify(result)
					)
				})
				.catch(err => {
					console.error(err)
				})
				.finally(() => {
					ack()
				})

			}
		),

	].reduce((accum, next) => accum.then(next), Promise.resolve())



})
.catch(err => {
	console.error('FATAL:', err)
	process.kill(process.pid, 'SIGTERM')
	setTimeout(() => process.kill(process.pid, 'SIGKILL'), 3000)
})
