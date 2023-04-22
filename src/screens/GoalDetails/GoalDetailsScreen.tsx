import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { Dispatch, useContext, useState, useEffect } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { Goal } from '../../@types/data/Goal.interface'
import colors from '../../../colors'
import { Image } from 'react-native'
import { ActionButtonsContainer } from '../../components/ActionButtonsContainer'
import { GoalActionButtons } from './data/GoalActionButtons'
import { CustomBigButton } from '../../components/CustomBigButton'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'
import { Oswald } from '../../styles/Oswald.font'

interface GoalDetailsScreenParams {
	goal: Goal
	incrementRateAvailable: number
	getAvailableBalance: () => number
	setDate: Dispatch<Date>
}

export function GoalDetailsScreen() {
	const navigator = useContext(NavigationContext)
	const route = useContext(NavigationRouteContext)
	const { goal, incrementRateAvailable, getAvailableBalance, setDate } =
		route.params as GoalDetailsScreenParams

	const [goalPic, setGoalPic] = useState('')

	useEffect(() => {
		setGoalPic(goal.goalPic)
	}, [goal])

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		})

		if (!result.canceled) {
			uploadImage(goal.owner, goal._id, result.assets[0].uri)
		}
	}

	const uploadImage = async (
		userId: string,
		goalId: string,
		newGoalPic: string
	) => {
		try {
			const response = await FileSystem.uploadAsync(
				`https://finances4u-api.bohr.io/api/user/${userId}/goals/${goalId}/goalPic/`,
				newGoalPic,
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

	return (
		<View className='flex-1 justify-start gap-2 px-4 py-2'>
			<View className='w-full flex-row items-center justify-start py-2'>
				<IconButton
					icon='keyboard-return'
					className='absolute bg-gray-1 w-11 h-11'
					onPress={() => navigator.goBack()}
				/>

				<Text
					variant='headlineLarge'
					className='w-9/12 text-center mx-[52px] p-2'
					style={Oswald.bold}
				>
					{goal.name}
				</Text>
			</View>

			<View className='items-center justify-evenly h-[600px]'>
				{goal.goalPic == '' ? (
					<IconButton
						icon='bullseye-arrow'
						iconColor={'#fff'}
						containerColor={colors.green[2]}
						className='w-[250px] h-[250px] rounded'
						size={200}
						onPress={pickImage}
					/>
				) : (
					<TouchableWithoutFeedback onPress={pickImage}>
						<View className='w-[250px] h-[250px]'>
							<Image
								source={{
									uri: `data:image/png;base64,${goalPic}`,
								}}
								className='w-full h-full rounded'
							/>
						</View>
					</TouchableWithoutFeedback>
				)}

				<View className='w-400 my-5 gap-4 items-center'>
					<View className='w-[250px] bg-green-1 px-2 py-1 rounded-full'>
						<Text
							variant='headlineMedium'
							className='w-full text-center text-white-1'
							style={Oswald.regular}
						>
							Meta: {goal.goalValue}
						</Text>
					</View>

					<Text
						variant='headlineSmall'
						className='w-full text-center'
						style={Oswald.regular}
					>
						Investido: R${goal.currentValue}
					</Text>

					<Text
						variant='headlineSmall'
						className='w-full text-center'
						style={Oswald.regular}
					>
						Incremento: {goal.incrementRate}%
					</Text>
				</View>

				<ActionButtonsContainer gap={8}>
					{GoalActionButtons(
						goal.owner,
						goal._id,
						getAvailableBalance(),
						incrementRateAvailable,
						navigator.navigate,
						setDate
					)}
				</ActionButtonsContainer>
			</View>

			<View className='w-full items-center my-8'>
				<CustomBigButton
					color={goal.currentValue >= goal.goalValue ? 'green' : 'red'}
					width={200}
					onPress={() => {
						if (goal.currentValue >= goal.goalValue) {
							;(async () => {
								const { data } = await axios.delete(
									`https://finances4u-api.bohr.io/api/user/${goal.owner}/goals/${goal._id}/delete`
								)
								if (data) {
									setDate(new Date())
									navigator.navigate('LoadingModal', { redirect: 'Home' })
								}
							})()
						} else
							navigator.navigate('ConfirmGoalDeleteModal', {
								goal: goal,
								setDate: setDate,
							})
					}}
				>
					{goal.currentValue >= goal.goalValue
						? 'Concluir Meta'
						: 'Excluir Meta'}
				</CustomBigButton>
			</View>
		</View>
	)
}
