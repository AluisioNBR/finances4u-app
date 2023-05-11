import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { useContext, useEffect, useState, Dispatch } from 'react'
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { DefaultInput } from '../../components/DefaultInput'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import colors from '../../../colors'
import { Image } from 'react-native'
import axios from 'axios'
import { Goal } from '../../@types/data/Goal.interface'
import { CustomBigButton } from '../../components/CustomBigButton'
import { Oswald } from '../../styles/Oswald.font'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader'

interface GoalCreationParams {
	userId: string
	availableBalance: number
	availableIncrementRate: number
	setDate: Dispatch<Date>
}

export function GoalCreationScreen() {
	const [name, setName] = useState('')
	const [goalValue, setGoalValue] = useState('')
	const [currentValue, setCurrentValue] = useState('0')
	const [incrementRate, setIncrementRate] = useState('')
	const [goalPic, setGoalPic] = useState(null)
	const [error, setError] = useState(null)

	const navigator = useContext(NavigationContext)
	const { params } = useContext(NavigationRouteContext)
	const { userId, availableBalance, availableIncrementRate, setDate } =
		params as GoalCreationParams

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
	}, [])

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		})

		if (!result.canceled) {
			setGoalPic(result.assets[0].uri)
		}
	}

	const uploadImage = async (goalId: string) => {
		try {
			await FileSystem.uploadAsync(
				`https://finances4u-api.bohr.io/api/user/${userId}/goals/${goalId}/goalPic/`,
				goalPic,
				{
					fieldName: 'file',
					httpMethod: 'PATCH',
					uploadType: FileSystem.FileSystemUploadType.MULTIPART,
				}
			)
		} catch (error) {
			console.log(error)
		}
	}

	const cleanFields = () => {
		setName('')
		setGoalValue('')
		setCurrentValue('0')
		setIncrementRate('')
		setGoalPic(null)
		setError(null)
	}

	useEffect(cleanFields, [])

	return (
		<ScrollView>
			<StandardScreen>
				<StandardHeader noMenu buttonPos={-200}>
					{''}
				</StandardHeader>

				<DefaultInput
					label='Qual o nome da sua meta ?'
					required
					bold
					helpMessage='Máximo de 18 caracteres'
					onChange={(newText) => setName(newText)}
				>
					{name}
				</DefaultInput>

				<DefaultInput
					label='De quanto precisa para atingir ? (R$)'
					required
					bold
					onChange={(newText) => setGoalValue(newText)}
				>
					{goalValue}
				</DefaultInput>

				<DefaultInput
					label='Gostaria de depositar uma quantia inicial ? (R$) Se não, ignore'
					bold
					helpMessage={`Disponível: R$${availableBalance}`}
					onChange={(newText) => setCurrentValue(newText)}
				>
					{currentValue}
				</DefaultInput>

				<DefaultInput
					label='Qual a taxa de incremento automático ? (%)'
					bold
					helpMessage={`Máximo de ${availableIncrementRate}%`}
					onChange={(newText) => setIncrementRate(newText)}
				>
					{incrementRate}
				</DefaultInput>

				<View className='flex-row items-center justify-evenly'>
					<Text className='text-green-3, text-[22px] w-1/2' style={Oswald.bold}>
						O que acha de uma foto para sua meta ?
					</Text>

					{!goalPic ? (
						<IconButton
							icon='bullseye-arrow'
							iconColor={'#fff'}
							containerColor={colors.green[2]}
							className='rounded'
							size={100}
							onPress={pickImage}
						/>
					) : (
						<TouchableWithoutFeedback onPress={pickImage}>
							<View className='w-[125px] h-[125px] p-1'>
								<Image
									source={{ uri: goalPic }}
									className='w-full h-full rounded'
								/>
							</View>
						</TouchableWithoutFeedback>
					)}
				</View>

				{!error ? null : (
					<Text className='text-xl text-red-1' style={Oswald.regular}>
						{error}
					</Text>
				)}

				<View className='flex-row justify-evenly w-full'>
					<CustomBigButton
						width={175}
						color='red'
						onPress={() => {
							cleanFields()
							navigator.goBack()
						}}
					>
						Cancelar
					</CustomBigButton>

					<CustomBigButton
						width={175}
						color='green'
						onPress={async () => {
							try {
								let goalValueNumber = parseFloat(goalValue),
									currentValueNumber = parseFloat(currentValue),
									incrementRateNumber = parseInt(incrementRate)

								if (
									isNaN(goalValueNumber) ||
									isNaN(currentValueNumber) ||
									isNaN(incrementRateNumber) ||
									name == ''
								)
									throw new Error(
										'Dados Incorretos! Por favor informe um nome, e nos valores numéricos digite apenas números. Para a taxa de incremento apenas números inteiros são aceitos. Caso a imagem fornecida tenha mais de 10mb ela não será aceita pelo sistema!'
									)

								const { data } = await axios.post<Goal>(
									`https://finances4u-api.bohr.io/api/user/${userId}/goals/create?name=${name}&goalValue=${goalValue}&currentValue=${currentValue}&incrementRate=${incrementRate}`
								)

								if (data) {
									if (goalPic) await uploadImage(data._id)
									setDate(new Date())
									navigator.navigate('LoadingModal', { redirect: 'Home' })
								}
							} catch (error) {
								setError(error.message)
							}
						}}
					>
						Criar Meta
					</CustomBigButton>
				</View>
			</StandardScreen>
		</ScrollView>
	)
}
