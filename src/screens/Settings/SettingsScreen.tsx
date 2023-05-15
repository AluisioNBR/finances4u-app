import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Oswald } from '../../styles/Oswald.font'
import colors from '../../../colors'
import React, { useContext, useEffect, useState } from 'react'
import { User } from '../../@types/data/User.interface'
import { uploadAsync, FileSystemUploadType } from 'expo-file-system'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import axios from 'axios'
import { NavigationContext } from '@react-navigation/native'
import { LoadingInfosAlert } from '../../components/LoadingInfosAlert'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'
import { UploadImgButton } from '../../components/UploadImgButton/UploadImgButton'
import { userInfo } from '../../components/userInfo'
import { DateContext } from './data/DateContext'
import { SettingsContainer } from './components/SettingsContainer'

export function SettingsScreen() {
	const navigator = useContext(NavigationContext)
	const [date, setDate] = useState(new Date())
	const [userData, setUserData] = useState<User>()
	const [profilePic, setProfilePic] = useState('')

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: true })
	}, [])

	useEffect(() => {
		;(async () => {
			const user = await axios.get<User>(
				`https://finances4u-api.bohr.io/api/user/${userInfo.userId}`
			)
			setUserData(user.data)
			setProfilePic(user.data.profilePic)
		})()
	}, [date])

	const pickImage = async () => {
		let result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		})

		if (!result.canceled) {
			uploadImage(userData._id, result.assets[0].uri)
		}
	}

	const uploadImage = async (userId: string, newGoalPic: string) => {
		try {
			navigator.navigate('LoadingModal', {
				redirect: 'Settings',
				barColor: 'blue',
				duration: 4000,
				title: 'Atualizando...',
			})
			await uploadAsync(
				`https://finances4u-api.bohr.io/api/user/${userId}/profilePic/`,
				newGoalPic,
				{
					fieldName: 'file',
					httpMethod: 'PATCH',
					uploadType: FileSystemUploadType.MULTIPART,
				}
			)
			setDate(new Date())
		} catch (error) {
			console.log(error)
		}
	}

	if (!userData)
		return (
			<LoadingInfosAlert>
				Estamos carregando suas informações...
			</LoadingInfosAlert>
		)
	return (
		<DateContext.Provider value={{ setDate: setDate }}>
			<StandardScreen>
				<StandardHeader>Configurações</StandardHeader>

				<View className='items-center'>
					<UploadImgButton
						icon='account'
						size={64}
						pickImage={pickImage}
						roundedFull
						borderColor={colors.black[1]}
						width={128}
						height={128}
					>
						{profilePic}
					</UploadImgButton>

					<Text variant='headlineMedium' style={Oswald.medium}>
						{userData.username}
					</Text>
				</View>

				<SettingsContainer
					_id={userData._id}
					password={userData.password}
					autoIncrement={userData.accountConfig.autoIncrement}
					blocksEdit={userData.accountConfig.blocksEdit}
				/>
			</StandardScreen>
		</DateContext.Provider>
	)
}
