import { Dispatch } from 'react'
import { ActionButtonProps } from '../../../components/ActionButtonsContainer'

export function HomeActionButtons(
	userId: string,
	availableBalance: number,
	incrementRateAvailable: number,
	navigate: (route: string, params: any) => void,
	setDate: Dispatch<Date>
): ActionButtonProps[] {
	return [
		{
			children: 'Criar Bloqueio',
			action: () =>
				navigate('HomeActionModal', {
					userId: userId,
					label1: 'Dê um nome para seu bloqueio',
					label2: 'Quanto irá bloquear ?',
					type: 'block',
					setDate: setDate,
					availableBalance: availableBalance,
				}),
			icon: 'block-helper',
			color: 'blue',
		},
		{
			children: 'Criar Meta',
			action: () => {
				navigate('GoalCreation', {
					userId: userId,
					availableBalance: availableBalance,
					availableIncrementRate: incrementRateAvailable,
					setDate: setDate,
				})
			},
			icon: 'bullseye-arrow',
			color: 'green',
		},
		{
			children: 'Adicionar',
			action: () =>
				navigate('HomeActionModal', {
					userId: userId,
					label1: 'O que está recebendo ?',
					label2: 'Quanto recebeu ?',
					type: 'receive',
					setDate: setDate,
				}),
			icon: 'cash-plus',
			color: 'green',
		},
		{
			children: 'Pagar',
			action: () =>
				navigate('HomeActionModal', {
					userId: userId,
					label1: 'Com o que está gastando ?',
					label2: 'Quanto irá gastar ?',
					type: 'pay',
					setDate: setDate,
					availableBalance: availableBalance,
				}),
			icon: 'cash-minus',
			color: 'red',
		},
	]
}
