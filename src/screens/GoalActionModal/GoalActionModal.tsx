import { useState, Dispatch, useEffect } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { useContext } from 'react'
import { CustomBigButton } from '../../components/CustomBigButton'
import { DefaultInput } from '../../components/DefaultInput'
import axios from 'axios'
import { Goal } from '../../@types/data/Goal.interface'
import { Oswald } from '../../styles/Oswald.font'

interface GoalActionModalParams {
	userId: string
	goalId: string
	type: 'edit' | 'increment' | 'decrement'
	setDate: Dispatch<Date>
	getAvailableBalance?: () => number
	availableIncrement?: number
}

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
	const buttonConfig = {
		edit: { color: 'red', text: 'Salvar' },
		increment: { color: 'green', text: 'Adicionar' },
		decrement: { color: 'red', text: 'Retirar' },
	}

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
		<View className='flex-1 items-center justify-center bg-[#0005]'>
			<View className='gap-4 bg-white-1 p-5 w-[95%] rounded-3xl justify-between'>
				{type == 'edit' ? (
					<>
						<DefaultInput
							required
							bold
							label='Qual será o novo nome ?'
							onChange={(newText) => {
								if (newText.length <= 24) setGoalName(newText)
							}}
							helpMessage='Máximo de 24 caracteres'
						>
							{goalName}
						</DefaultInput>

						<DefaultInput
							required
							bold
							label='Qual é a nova meta ?'
							onChange={(newText) => setGoalValue(newText)}
						>
							{goalValue}
						</DefaultInput>

						<DefaultInput
							required
							bold
							label='Qual a taxa de incremento ?'
							onChange={(newText) => setIncrement(newText)}
						>
							{increment}
						</DefaultInput>
					</>
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

				{error == '' ? null : (
					<Text className='text-center text-red-1' style={Oswald.bold}>
						{error}
					</Text>
				)}

				<View className='mt-3 flex-row justify-evenly w-full'>
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
						onPress={async () => {
							try {
								if (
									type == 'edit' &&
									(goalName == '' ||
										isNaN(parseFloat(goalValue)) ||
										isNaN(parseInt(increment)) ||
										parseInt(increment) > availableIncrement)
								)
									throw new Error('Edit Error')
								else if (
									(type != 'edit' && isNaN(parseFloat(value))) ||
									(type == 'increment' &&
										parseFloat(value) > getAvailableBalance())
								)
									throw new Error('Change Error')

								const endpoint =
									type == 'edit'
										? `edit?name=${goalName}&goalValue=${goalValue}&incrementRate=${increment}`
										: `${type}/${value}`

								const { data } = await axios.patch(
									`https://finances4u-api.bohr.io/api/user/${userId}/goals/${goalId}/${endpoint}`
								)

								if (data) {
									setDate(new Date())
									cleanFields()
									navigator.navigate('LoadingModal', {
										redirect: 'GoalDetails',
										routeParams: {
											userId: goalData.owner,
											goalId: goalData._id,
											getAvailableBalance: getAvailableBalance,
										},
										title:
											type == 'edit'
												? 'Salvando...'
												: type == 'increment'
												? 'Adicionando...'
												: 'Retirando...',
										barColor:
											type == 'edit'
												? 'blue'
												: type == 'increment'
												? 'green'
												: 'red',
									})
								}
							} catch (error) {
								if (type == 'edit')
									setError(
										'Certifique-se de ter nomeado, e que os valores que foram digitados foram apenas números!'
									)
								else
									setError(
										'Certifique-se de que o valor digitado é um número e de que é possível usá-lo!'
									)
							}
						}}
					>
						{buttonConfig[type].text}
					</CustomBigButton>
				</View>
			</View>
		</View>
	)
}
