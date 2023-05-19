import { Dispatch } from 'react'
import { ActionButtonProps } from '../../../components/ActionButtons/types/ActionButtonProps.interface'

export function GoalActionButtons(
	userId: string,
	goalId: string,
	balance: number,
	incrementRateAvailable: number,
	navigate: (route: string, params: any) => void,
	setDate: Dispatch<Date>
): ActionButtonProps[] {
	return [
		{
			children: 'Adicionar',
			action: () =>
				navigate('GoalActionModal', {
					userId: userId,
					goalId: goalId,
					type: 'increment',
					setDate: setDate,
					balance: balance,
					availableIncrement: incrementRateAvailable,
				}),
			icon: 'cash-plus',
			color: 'green',
		},
		{
			children: 'Remover',
			action: () =>
				navigate('GoalActionModal', {
					userId: userId,
					goalId: goalId,
					type: 'decrement',
					setDate: setDate,
					balance: balance,
					availableIncrement: incrementRateAvailable,
				}),
			icon: 'cash-minus',
			color: 'red',
		},
		{
			children: 'Editar',
			action: () =>
				navigate('GoalActionModal', {
					userId: userId,
					goalId: goalId,
					type: 'edit',
					setDate: setDate,
					balance: balance,
					availableIncrement: incrementRateAvailable,
				}),
			icon: 'file-document-edit',
			color: 'red',
		},
	]
}
