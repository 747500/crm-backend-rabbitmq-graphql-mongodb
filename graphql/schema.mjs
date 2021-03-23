

export default `

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
		users(notified: Boolean): [User]
	}

`
