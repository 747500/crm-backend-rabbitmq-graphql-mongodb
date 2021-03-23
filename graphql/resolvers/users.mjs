
import { fieldsList, fieldsMap } from 'graphql-fields-list'
import model from '../../model/index.mjs'

export function users ({ notified }, context, info) {
	const fields = fieldsList(info, {
		transform: {
			version: '__v',
			id: '_id',
		}
	})

	const query = model.User.find().select(fields)

	if (notified) {
		query.where('notifyTelegramId').ne(null)
		query.where('notifyBirthdayAt').ne(null)
	}

	return query.exec()
}
