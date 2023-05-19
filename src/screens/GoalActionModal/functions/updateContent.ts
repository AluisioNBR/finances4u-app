import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Dispatch } from 'react'
import { Goal } from '../../../@types/data/Goal.interface'

export function updateContent(
	type: 'edit' | 'increment' | 'decrement',
	goalData: Goal,
	balance: number,
	setDate: Dispatch<Date>,
	cleanFields: () => void,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	setDate(new Date())
	cleanFields()
	navigator.navigate('LoadingModal', {
		redirect: 'GoalDetails',
		routeParams: {
			userId: goalData.owner,
			goalId: goalData._id,
			balance: balance,
		},
		title:
			type == 'edit'
				? 'Salvando...'
				: type == 'increment'
				? 'Adicionando...'
				: 'Retirando...',
		barColor: type == 'edit' ? 'blue' : type == 'increment' ? 'green' : 'red',
	})
}
