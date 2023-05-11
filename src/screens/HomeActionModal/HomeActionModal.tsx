import { useState, useEffect, Dispatch } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { useContext } from 'react'
import { CustomBigButton } from '../../components/CustomBigButton'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import axios from 'axios'
import { Oswald } from '../../styles/Oswald.font'

interface HomeActionModalParams {
	userId: string
	label1: string
	label2: string
	type: 'block' | 'receive' | 'pay'
	setDate: Dispatch<Date>
	availableBalance?: number
}

export function HomeActionModal() {
	const navigator = useContext(NavigationContext)
	const { params } = useContext(NavigationRouteContext)
	const { userId, label1, label2, type, setDate, availableBalance } =
		params as HomeActionModalParams
	const buttonConfig = {
		block: { color: 'blue', text: 'Bloquear' },
		receive: { color: 'green', text: 'Adicionar' },
		pay: { color: 'red', text: 'Pagar' },
	}

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
	}, [])

	const [input1, setInput1] = useState('')
	const [input2, setInput2] = useState('')
	const [error, setError] = useState('')

	return (
		<View className='flex-1 items-center justify-center bg-[#0005]'>
			<View className='bg-white-2 p-5 w-[95%] h-[370px] rounded-3xl justify-between'>
				<DefaultInput
					required
					bold
					label={label1}
					onChange={(newText) => {
						if (newText.length <= 24) setInput1(newText)
					}}
					helpMessage='Máximo de 24 caracteres'
				>
					{input1}
				</DefaultInput>

				<DefaultInput
					required
					bold
					label={label2}
					onChange={(newText) => {
						if (availableBalance && parseFloat(newText) <= availableBalance)
							setInput2(newText)
						else setInput2(newText)
					}}
					helpMessage={
						availableBalance != undefined && availableBalance != null
							? `Disponível: R$${availableBalance}`
							: null
					}
				>
					{input2}
				</DefaultInput>

				{error == '' ? null : (
					<Text className='text-red-1 text-center' style={Oswald.bold}>
						{error}
					</Text>
				)}

				<View className='flex-row justify-evenly w-full'>
					<CustomBigButton
						width={150}
						color='red'
						onPress={() => {
							setInput1('')
							setInput2('')
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
								const value = parseFloat(input2)
								if (
									isNaN(value) ||
									(type != 'receive' && value > availableBalance)
								)
									throw new Error()

								const endpoint =
									type == 'block'
										? `blocks/create`
										: `statement/register/${
												type == 'receive' ? 'receipt' : 'payment'
										  }`

								const { data } = await axios.post(
									`https://finances4u-api.bohr.io/api/user/${userId}/${endpoint}?name=${input1}&value=${value}`
								)

								if (data) {
									setDate(new Date())
									setError('')
									navigator.navigate('LoadingModal', {
										redirect: 'Home',
										title:
											type == 'block'
												? 'Criando'
												: type == 'receive'
												? 'Adicionando'
												: 'Pagando',
										barColor:
											type == 'block' || type == 'receive' ? 'green' : 'red',
									})
								}
							} catch (error) {
								setError(
									'Certifique-se de ter nomeado, e que o valor que foi digitado foram apenas números e de que tem saldo suficiente disponível!'
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
