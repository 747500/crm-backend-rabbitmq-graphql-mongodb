

export default `

	type User {
		id: ID!,
		name: String!,
		notifyBirthdayAt: String,
		notifyTelegramId: String,
		ctime: String!,
		mtime: String,
		version: String,
	},

	type ContactData {
		_id: ID,
		data: String,
		description: String
	},

	interface Doc {
		id: ID!,
		ctime: String!,
		mtime: String!,
		version: String,
	},

	type PersonData {
		firstName: String,
		middleName: String,
		lastName: String,
		birthDay: String,
		comments: String,
		contact: [ContactData!],
	}

	type Person implements Doc {
		id: ID!,
		ctime: String!,
		mtime: String!,
		version: String,
		person: PersonData,
	},

	type PropertyData {
		address: String,
		price: String,
		description: String,
	},

	type Property implements Doc {
		id: ID!,
		ctime: String!,
		mtime: String!,
		version: String,
		property: PropertyData,
		owner: String,
		mainPicture: String,
	},

	union Docs = Person | Property,

	type Query {

		user(id: ID!): User,
		users(notified: Boolean): [User],

		doc(id: ID!): Docs,
		docs: [Docs],

	}

`
