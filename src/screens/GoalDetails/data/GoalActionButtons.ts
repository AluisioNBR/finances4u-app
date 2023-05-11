import { Dispatch } from 'react'
import { ActionButtonProps } from '../../../components/ActionButtons/ActionButtonsContainer'

export function GoalActionButtons(
	userId: string,
	goalId: string,
	getAvailableBalance: () => number,
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
					getAvailableBalance: getAvailableBalance,
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
					getAvailableBalance: getAvailableBalance,
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
					getAvailableBalance: getAvailableBalance,
					availableIncrement: incrementRateAvailable,
				}),
			icon: 'file-document-edit',
			color: 'red',
		},
	]
}
