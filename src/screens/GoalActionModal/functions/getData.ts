import axios from 'axios'
import { Goal } from '../../../@types/data/Goal.interface'

export async function getData(
	type: 'edit' | 'increment' | 'decrement',
	goalName: string,
	goalValue: string,
	increment: string,
	value: string,
	userId: string,
	goalId: string
) {
	const endpoint =
		type == 'edit'
			? `edit?name=${goalName}&goalValue=${goalValue}&incrementRate=${increment}`
			: `${type}/${value}`

	const { data } = await axios.patch<Goal>(
		`https://finances4u-api.bohr.io/api/user/${userId}/goals/${goalId}/${endpoint}`
	)
	return data
}
