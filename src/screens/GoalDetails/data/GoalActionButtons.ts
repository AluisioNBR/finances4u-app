import { Dispatch } from 'react'
import { ActionButtonProps } from '../../../components/ActionButtonsContainer'

export function GoalActionButtons(
	userId: string,
	goalId: string,
	availableBalance: number,
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
					availableBalance: availableBalance,
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
					availableIncrement: incrementRateAvailable,
				}),
			icon: 'file-document-edit',
			color: 'red',
		},
	]
}
