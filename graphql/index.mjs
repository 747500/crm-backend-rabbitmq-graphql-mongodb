
import { graphql, buildSchema } from 'graphql'

import schemaText from './schema.mjs'
import { user, users } from './resolvers/index.mjs'

const schema = buildSchema(schemaText)

export default function (query) {
	return graphql(
		schema,
		query,
		{
			user,
			users,
		}
	)
}
