import { Dispatch } from 'react'
import { Goal } from '../../../@types/data/Goal.interface'
import { checkErrors } from './checkErrors'
import { getData } from './getData'
import { showError } from './showError'
import { updateContent } from './updateContent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

export async function confirmAction(
	userId: string,
	goalId: string,
	type: 'edit' | 'increment' | 'decrement',
	goalData: Goal,
	goalName: string,
	goalValue: string,
	value: string,
	increment: string,
	availableIncrement: number,
	getAvailableBalance: () => number,
	setError: Dispatch<string>,
	setDate: Dispatch<Date>,
	cleanFields: () => void,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	try {
		checkErrors(
			type,
			goalName,
			goalValue,
			value,
			increment,
			availableIncrement,
			getAvailableBalance
		)

		const data = await getData(
			type,
			goalName,
			goalValue,
			increment,
			value,
			userId,
			goalId
		)

		if (data)
			updateContent(
				type,
				goalData,
				getAvailableBalance,
				setDate,
				cleanFields,
				navigator
			)
	} catch (error) {
		showError(type, setError)
	}
}
