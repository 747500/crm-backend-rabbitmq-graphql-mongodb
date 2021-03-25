
import { fieldsList, fieldsMap } from 'graphql-fields-list'
import { Doc } from '../../model/index.mjs'

function capitalize([ first, ...rest ]) {
	return [ first.toUpperCase(), ...rest ].join('')
}

function doc ({ id }, context, info) {
	const fields = fieldsList(info, {
		transform: {
			version: '__v',
			id: '_id',
			__typename: 'kind',
		}
	})

	console.log(fields)

	const query = Doc.findOne({ _id: id }).select(fields)

	return query.exec().then(result => {

		const { _id, kind, __v, ...data } = result.toObject()

		data.id = _id
		data.version = __v
		data.__typename = capitalize(kind)

		console.log(data)

		return data
	})
}

export {
	doc,
}
