
import { fieldsList, fieldsMap } from 'graphql-fields-list'
import model from '../../model/index.mjs'

export function user ({ id }, context, info) {
	const fields = fieldsList(info, {
		transform: {
			version: '__v',
			id: '_id',
		}
	})

	return model.User.findOne({ _id: id }).select(fields)
}
