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
import { Oswald } from '../../styles/Oswald.font'
import { Block } from '../../@types/data/Block.interface'

interface GoalActionModalParams {
	userId: string
	blockId: string
	blockName: string
	blockValue: number
	setDate: Dispatch<Date>
	availableBalance?: number
}

export function BlocksEditModal() {
	const navigator = useContext(NavigationContext)
	const { params } = useContext(NavigationRouteContext)
	const { userId, blockId, blockName, blockValue, setDate, availableBalance } =
		params as GoalActionModalParams

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
	}, [])

	const [name, setName] = useState(blockName)
	const [value, setValue] = useState(`${blockValue}`)
	const [error, setError] = useState('')

	const cleanFields = () => {
		setName('')
		setValue('')
		setError('')
	}

	return (
		<View className='flex-1 items-center justify-center bg-[#0005]'>
			<View className='absolute left-6 gap-4 bg-white-1 p-5 w-[96%] rounded-3xl justify-between'>
				<DefaultInput
					required
					bold
					label='Nome do bloqueio'
					onChange={(newText) => {
						if (newText.length <= 24) setName(newText)
					}}
					helpMessage='Máximo de 24 caracteres'
				>
					{name}
				</DefaultInput>

				<DefaultInput
					required
					bold
					label='Valor do Bloqueio'
					helpMessage={`Disponível: R$${availableBalance}`}
					onChange={(newValue) =>
						setValue((prevState) => {
							if (Number(newValue) > availableBalance) return prevState
							else return newValue
						})
					}
				>
					{value}
				</DefaultInput>

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
						color='green'
						onPress={async () => {
							saveEdition(userId, blockId, name, value, setDate, setError)
							navigator.navigate('LoadingModal', {
								redirect: 'Blocks',
								title: 'Salvando...',
							})
						}}
					>
						Salvar
					</CustomBigButton>
				</View>
			</View>
		</View>
	)
}

async function saveEdition(
	owner: string,
	id: string,
	name: string,
	value: string,
	setDate: Dispatch<Date>,
	setError: Dispatch<string>
) {
	try {
		if (isNaN(Number(value)))
			throw new Error('Certifique-se de digitar apenas números, por favor!')
		const { data } = await axios.patch<Block>(
			`https://finances4u-api.bohr.io/api/user/${owner}/blocks/${id}/edit/?name=${name}&value=${value}`
		)
		if (data._id == id) setDate(new Date())
	} catch (error) {
		setError(error.message)
	}
}
