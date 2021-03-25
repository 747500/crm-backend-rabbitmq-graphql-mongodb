
import { fieldsList, fieldsMap } from 'graphql-fields-list'
import { Doc } from '../../model/index.mjs'

export function docs (args, context, info) {
	const fields = fieldsList(info, {
		transform: {
			version: '__v',
			id: '_id',
		}
	})

	const query = Doc.find().select([ 'kind', ...fields ])

	//if (notified) {
	//	query.where('notifyTelegramId').ne(null)
	//	query.where('notifyBirthdayAt').ne(null)
	//}

	return query.exec()
}
