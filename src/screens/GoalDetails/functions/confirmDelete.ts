import { NavigationProp, ParamListBase } from '@react-navigation/native'
import axios from 'axios'
import { Dispatch } from 'react'
import { Goal } from '../../../@types/data/Goal.interface'

export async function confirmDelete(
	goalData: Goal,
	setDate: Dispatch<Date>,
	setDateHome: Dispatch<Date>,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	if (goalData.currentValue >= goalData.goalValue) {
		await deleteCompleteGoal(goalData, setDate, setDateHome, navigator)
	} else
		navigator.navigate('ConfirmGoalDeleteModal', {
			goal: goalData,
			setDateHome: setDateHome,
		})
}

async function deleteCompleteGoal(
	goalData: Goal,
	setDate: Dispatch<Date>,
	setDateHome: Dispatch<Date>,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	const { data } = await axios.delete(
		`https://finances4u-api.bohr.io/api/user/${goalData.owner}/goals/${goalData._id}/delete`
	)
	if (data) {
		setDate(new Date())
		setDateHome(new Date())
		navigator.navigate('LoadingModal', {
			redirect: 'Home',
			title: 'Concluindo...',
			barColor: 'green',
		})
	}
}
