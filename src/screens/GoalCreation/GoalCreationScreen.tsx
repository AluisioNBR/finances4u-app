import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { CustomBigButton } from '../../components/CustomBigButton'
import { Oswald } from '../../styles/Oswald.font'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'
import { GoalCreationParams } from './types/GoalCreationParams.interface'
import { ErrorMsg } from '../../components/ErrorMsg'
import { ModalStandardButtonsContainer } from '../../components/ModalStandardButtonsContainer'
import { UploadImgButton } from '../../components/UploadImgButton/UploadImgButton'
import { createGoal } from './functions/createGoal'

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
				<StandardHeader noMenu>{''}</StandardHeader>

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

					<UploadImgButton
						size={100}
						width={125}
						height={125}
						icon='bullseye-arrow'
						pickImage={pickImage}
					>
						{goalPic}
					</UploadImgButton>
				</View>

				<ErrorMsg>{error}</ErrorMsg>

				<ModalStandardButtonsContainer>
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
						onPress={async () =>
							await createGoal(
								userId,
								name,
								goalValue,
								currentValue,
								incrementRate,
								goalPic,
								uploadImage,
								setError,
								setDate,
								navigator
							)
						}
					>
						Criar Meta
					</CustomBigButton>
				</ModalStandardButtonsContainer>
			</StandardScreen>
		</ScrollView>
	)
}
