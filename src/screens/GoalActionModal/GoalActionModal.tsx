import { useState, useEffect } from 'react'
import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { useContext } from 'react'
import { CustomBigButton } from '../../components/CustomBigButton'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import axios from 'axios'
import { Goal } from '../../@types/data/Goal.interface'
import { ModalStandardButtonsContainer } from '../../components/ModalStandardButtonsContainer'
import { StandardModal } from '../../components/StandardModal'
import { ErrorMsg } from '../../components/ErrorMsg'
import { GoalActionModalParams } from './types/GoalActionModalParams.interface'
import { confirmAction } from './functions/confirmAction'
import { EditInputs } from './components/EditInputs'
import { buttonConfig } from './data/buttonConfig'

export function GoalActionModal() {
	const navigator = useContext(NavigationContext)
	const { params } = useContext(NavigationRouteContext)
	const {
		userId,
		goalId,
		type,
		setDate,
		getAvailableBalance,
		availableIncrement,
	} = params as GoalActionModalParams

	const [goalData, setGoalData] = useState<Goal>()
	const [goalName, setGoalName] = useState('')
	const [goalValue, setGoalValue] = useState('')
	const [increment, setIncrement] = useState('')
	const [currentValue, setCurrentValue] = useState(0)
	const [value, setValue] = useState('')
	const [error, setError] = useState('')

	const cleanFields = () => {
		setGoalName('')
		setGoalValue('')
		setIncrement('')
		setCurrentValue(0)
		setValue('')
		setError('')
	}

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
		;(async () => {
			const { data } = await axios.get<Goal>(
				`https://finances4u-api.bohr.io/api/user/${userId}/goals/${goalId}`
			)
			setGoalData(data)
			setGoalName(data.name)
			setGoalValue(`${data.goalValue}`)
			setCurrentValue(data.currentValue)
			setIncrement(`${data.incrementRate}`)
		})()
	}, [])

	return (
		<StandardModal>
			{type == 'edit' ? (
				<EditInputs
					goalName={goalName}
					setGoalName={setGoalName}
					goalValue={goalName}
					setGoalValue={setGoalValue}
					increment={increment}
					setIncrement={setIncrement}
				/>
			) : (
				<DefaultInput
					required
					bold
					label={
						type == 'increment'
							? 'Quanto deseja adicionar ?'
							: 'Quanto deseja retirar ?'
					}
					helpMessage={
						type == 'increment'
							? `Disponível: R$${getAvailableBalance()}`
							: `Pode retirar até R$${currentValue}`
					}
					onChange={(newValue) => setValue(newValue)}
				>
					{value}
				</DefaultInput>
			)}

			<ErrorMsg>{error}</ErrorMsg>

			<ModalStandardButtonsContainer>
				<CustomBigButton
					width={150}
					color='red'
					onPress={() => {
						cleanFields()
						navigator.goBack()
					}}
				>
					Cancelar
				</CustomBigButton>

				<CustomBigButton
					width={150}
					color={buttonConfig[type].color as 'blue' | 'green' | 'red'}
					onPress={async () =>
						await confirmAction(
							userId,
							goalId,
							type,
							goalData,
							goalName,
							goalValue,
							value,
							increment,
							availableIncrement,
							getAvailableBalance,
							setError,
							setDate,
							cleanFields,
							navigator
						)
					}
				>
					{buttonConfig[type].text}
				</CustomBigButton>
			</ModalStandardButtonsContainer>
		</StandardModal>
	)
}
