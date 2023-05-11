import {
	NavigationContext,
	NavigationRouteContext,
	useFocusEffect,
} from '@react-navigation/native'
import { Dispatch, useContext, useState, useEffect, useCallback } from 'react'
import { BackHandler, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Goal } from '../../@types/data/Goal.interface'
import { ActionButtonsContainer } from '../../components/ActionButtons/ActionButtonsContainer'
import { GoalActionButtons } from './data/GoalActionButtons'
import { CustomBigButton } from '../../components/CustomBigButton'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'
import { Oswald } from '../../styles/Oswald.font'
import { User } from '../../@types/data/User.interface'
import { LoadingInfosAlert } from '../../components/LoadingInfosAlert'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'
import { UploadImgButton } from '../../components/UploadImgButton/UploadImgButton'

interface GoalDetailsScreenParams {
	userId: string
	goalId: string
	getAvailableBalance: () => number
	setDateHome: Dispatch<Date>
}

export function GoalDetailsScreen() {
	const navigator = useContext(NavigationContext)
	const route = useContext(NavigationRouteContext)
	const { userId, goalId, getAvailableBalance, setDateHome } =
		route.params as GoalDetailsScreenParams

	const [date, setDate] = useState(new Date())
	const [incrementRateAvailable, setIncrementRateAvailable] = useState(0)
	const [goalData, setGoalData] = useState<Goal>()
	const [goalPic, setGoalPic] = useState('')

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
	}, [])

	useEffect(() => {
		;(async () => {
			const { data } = await axios.get<Goal>(
				`https://finances4u-api.bohr.io/api/user/${userId}/goals/${goalId}`
			)
			setGoalData(data)
			setGoalPic(data.goalPic)

			const response = await axios.get<User>(
				`https://finances4u-api.bohr.io/api/user/${userId}/`
			)
			setIncrementRateAvailable(response.data.incrementRateAvailable)
		})()
	}, [date])

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		})

		if (!result.canceled) {
			uploadImage(goalData.owner, goalData._id, result.assets[0].uri)
		}
	}

	const uploadImage = async (
		userId: string,
		goalId: string,
		newGoalPic: string
	) => {
		try {
			navigator.navigate('LoadingModal', {
				redirect: 'GoalDetails',
				barColor: 'blue',
				duration: 4000,
				title: 'Atualizando...',
			})
			await FileSystem.uploadAsync(
				`https://finances4u-api.bohr.io/api/user/${userId}/goals/${goalId}/goalPic/`,
				newGoalPic,
				{
					fieldName: 'file',
					httpMethod: 'PATCH',
					uploadType: FileSystem.FileSystemUploadType.MULTIPART,
				}
			)
			setDate(new Date())
		} catch (error) {
			console.log(error)
		}
	}

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				setDateHome(new Date())
				navigator.goBack()
				return true
			}

			const subscription = BackHandler.addEventListener(
				'hardwareBackPress',
				onBackPress
			)

			return () => subscription.remove()
		}, [])
	)

	if (!goalData)
		return (
			<LoadingInfosAlert>
				{'Carregando informações\nda meta...'}
			</LoadingInfosAlert>
		)
	else
		return (
			<StandardScreen>
				<StandardHeader
					noMenu
					buttonPos={-105}
					bold
					callback={() => setDateHome(new Date())}
				>
					{goalData.name}
				</StandardHeader>

				<View className='items-center justify-evenly h-[600px]'>
					<UploadImgButton
						pickImage={pickImage}
						icon='bullseye-arrow'
						size={200}
						width={250}
						height={250}
					>
						{goalPic}
					</UploadImgButton>

					<View className='w-400 my-5 gap-4 items-center'>
						<View className='w-[250px] bg-green-1 px-2 py-1 rounded-full'>
							<Text
								variant='headlineMedium'
								className='w-full text-center text-white-1'
								style={Oswald.regular}
							>
								Meta: {goalData.goalValue}
							</Text>
						</View>

						<Text
							variant='headlineSmall'
							className='w-full text-center'
							style={Oswald.regular}
						>
							Investido: R${goalData.currentValue}
						</Text>

						<Text
							variant='headlineSmall'
							className='w-full text-center'
							style={Oswald.regular}
						>
							Incremento: {goalData.incrementRate}%
						</Text>
					</View>

					<ActionButtonsContainer gap={8}>
						{GoalActionButtons(
							goalData.owner,
							goalData._id,
							getAvailableBalance,
							incrementRateAvailable,
							navigator.navigate,
							setDate
						)}
					</ActionButtonsContainer>
				</View>

				<View className='w-full items-center my-8'>
					<CustomBigButton
						color={
							goalData.currentValue >= goalData.goalValue ? 'green' : 'red'
						}
						width={200}
						onPress={() => {
							if (goalData.currentValue >= goalData.goalValue) {
								;(async () => {
									const { data } = await axios.delete(
										`https://finances4u-api.bohr.io/api/user/${goalData.owner}/goals/${goalData._id}/delete`
									)
									if (data) {
										setDate(new Date())
										setDateHome(new Date())
										navigator.navigate('LoadingModal', {
											redirect: 'Home',
											title: 'Concluindo...',
											barColor: 'green',
										})
									}
								})()
							} else
								navigator.navigate('ConfirmGoalDeleteModal', {
									goal: goalData,
									setDateHome: setDateHome,
								})
						}}
					>
						{goalData.currentValue >= goalData.goalValue
							? 'Concluir Meta'
							: 'Excluir Meta'}
					</CustomBigButton>
				</View>
			</StandardScreen>
		)
}
