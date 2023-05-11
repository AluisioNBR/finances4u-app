import { TouchableWithoutFeedback, View, Image } from 'react-native'
import { Switch, Text } from 'react-native-paper'
import { Oswald } from '../../styles/Oswald.font'
import colors from '../../../colors'
import React, { useContext, useEffect, useState, createContext } from 'react'
import { User } from '../../@types/data/User.interface'
import { uploadAsync, FileSystemUploadType } from 'expo-file-system'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import axios from 'axios'
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { NavigationContext } from '@react-navigation/native'
import { LoadingInfosAlert } from '../../components/LoadingInfosAlert'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader'
import { UploadImgButton } from '../../components/UploadImgButton'
import { userInfo } from '../../components/userInfo'

interface DateContextInterface {
	setDate: React.Dispatch<Date>
}
const DateContext: React.Context<DateContextInterface> = createContext({
	setDate: () => {},
})

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

				<View>
					<SwitchSetting
						title='Incremento automático'
						color='green'
						on={userData.accountConfig.autoIncrement}
						onChangeValue={async () => {
							await axios.patch<User>(
								`https://finances4u-api.bohr.io/api//user/${userData._id}/change/autoIncrement/`
							)
						}}
					>
						Ao adcionar dinheiro, as metas receberão investimento
						automáticamente
					</SwitchSetting>

					<SwitchSetting
						title='Edição de Bloqueios'
						color='green'
						on={userData.accountConfig.blocksEdit}
						onChangeValue={async () => {
							await axios.patch<User>(
								`https://finances4u-api.bohr.io/api//user/${userData._id}/change/blocksEdit/`
							)
						}}
					>
						Permite com que o usuário edite informações sobre bloqueios
					</SwitchSetting>

					<SettingActionButton
						userId={userData._id}
						password={userData.password}
						title='Alterar Nome de Usuário'
						color='blue'
						action='changeName'
					>
						Altera o nome de usuário da sua conta
					</SettingActionButton>

					<SettingActionButton
						userId={userData._id}
						password={userData.password}
						title='Deletar Conta'
						color='red'
						action='deleteAccount'
					>
						<>
							Encerra e deleta sua conta.{' '}
							<Text className='text-white-1' style={Oswald.bold}>
								Atenção, essa ação é irreversível!
							</Text>
						</>
					</SettingActionButton>
				</View>
			</StandardScreen>
		</DateContext.Provider>
	)
}

interface SwitchSettingProps {
	title: string
	children: string
	on?: boolean
	color?: 'green' | 'red' | 'blue'
	onChangeValue: () => void
}

function SwitchSetting(props: SwitchSettingProps) {
	const [isSwitchOn, setIsSwitchOn] = useState(props.on ? true : false)
	const switchColor =
		props.color == 'green'
			? colors.green[1]
			: props.color == 'red'
			? colors.red[1]
			: colors.blue[0]
	const valueChange = () => {
		setIsSwitchOn(!isSwitchOn)
		props.onChangeValue()
	}

	return (
		<View className='w-full flex-row items-center justify-between p-4'>
			<View className='w-4/5'>
				<Text variant='titleLarge' style={Oswald.regular}>
					{props.title}
				</Text>

				<Text variant='titleSmall' style={Oswald.regular}>
					{props.children}
				</Text>
			</View>

			<Switch
				value={isSwitchOn}
				onValueChange={valueChange}
				color={switchColor}
			/>
		</View>
	)
}

interface SettingActionButtonProps {
	color?: 'green' | 'red' | 'blue'
	title: string
	children: string | JSX.Element
	action: 'changeName' | 'deleteAccount'
	userId: string
	password: string
}

function SettingActionButton(props: SettingActionButtonProps) {
	const navigator = useContext(NavigationContext)
	const { setDate } = useContext(DateContext)
	const buttonColors = {
		green: {
			background: colors.green[2],
			pressed: colors.green[3],
			text: colors.white[1],
		},
		red: {
			background: colors.red[1],
			pressed: colors.red[2],
			text: colors.white[1],
		},
		blue: {
			background: colors.blue[1],
			pressed: colors.blue[2],
			text: colors.white[1],
		},
	}
	const pressed = useSharedValue(0)
	const buttonTypeColor = props.color ? props.color : 'green'

	const backgroundAnimation = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				pressed.value,
				[0, 1],
				[
					buttonColors[buttonTypeColor].background,
					buttonColors[buttonTypeColor].pressed,
				]
			),
		}
	})
	return (
		<TouchableWithoutFeedback
			onPressIn={() => (pressed.value = withTiming(1, { duration: 150 }))}
			onPress={() =>
				navigator.navigate('SettingsModal', {
					userId: props.userId,
					action: props.action,
					userPassword: props.password,
					setDate: setDate,
				})
			}
			onPressOut={() => (pressed.value = withTiming(0, { duration: 150 }))}
		>
			<Animated.View
				className='mx-4 my-2 p-4 h-24 justify-center'
				style={backgroundAnimation}
			>
				<Text
					variant='titleLarge'
					style={[
						Oswald.regular,
						{ color: buttonColors[buttonTypeColor].text },
					]}
				>
					{props.title}
				</Text>

				<Text
					variant='titleSmall'
					style={[
						Oswald.regular,
						{ color: buttonColors[buttonTypeColor].text },
					]}
				>
					{props.children}
				</Text>
			</Animated.View>
		</TouchableWithoutFeedback>
	)
}
