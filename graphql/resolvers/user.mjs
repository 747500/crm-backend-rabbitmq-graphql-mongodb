
import util from 'util'

import { fieldsList, fieldsMap } from 'graphql-fields-list'
import model from '../../model/index.mjs'


export function user ({ id }, context, info) {
	const fields = fieldsList(info, {
		transform: {
			version: '__v',
			id: '_id',
		}
	})

	console.log('info', util.inspect(info.fieldNodes, { depth: 5 }))

	const fList = fields.join(' ')

	try {
		console.log('* graphql rebuild:', `{ ${info.fieldName}(id: "${id}") { ${fList} } }`)
	}
	catch (e) {
		console.error(e)
	}

	const query = model.User.findOne({ _id: id }).select(fields)

	return query.exec().then(result => {

		const { _id, __v, ...data } = result.toObject()

		data.id = _id
		data.version = __v
		data.__typename = 'User'

		return data
	})
}
