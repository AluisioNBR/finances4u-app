import { View, Image } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Drawer, Text } from 'react-native-paper'
import { useState, useEffect } from 'react'
import { DefaultUser, User } from '../@types/data/User.interface'
import axios from 'axios'
import { Oswald } from '../styles/Oswald.font'
import colors from '../../colors'
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native'
import {
	DrawerDescriptorMap,
	DrawerNavigationHelpers,
} from '@react-navigation/drawer/lib/typescript/src/types'
import { UploadImgButton } from './UploadImgButton'
import { userInfo } from './userInfo'

const routesConfig = [
	{
		label: 'Início',
		icon: 'home',
		name: 'Home',
	},
	{
		label: 'Bloqueios',
		icon: 'block-helper',
		name: 'Blocks',
	},
	{
		label: 'Configurações',
		icon: 'account-settings',
		name: 'Settings',
	},
	{
		label: 'Suporte',
		icon: 'wechat',
		name: 'Support',
	},
	{
		label: 'Sugestões',
		icon: 'chat-processing-outline',
		name: 'Sugestions',
	},
	{
		label: 'Sobre',
		icon: 'information-variant',
		name: 'About',
	},
]

interface MenuDrawerInterface {
	descriptors: DrawerDescriptorMap
	state: DrawerNavigationState<ParamListBase>
	navigation: DrawerNavigationHelpers
}

export function MenuDrawer(props: MenuDrawerInterface) {
	const [userData, setUserData] = useState<User>(DefaultUser)
	const [profilePic, setProfilePic] = useState('')
	const { navigation } = props

	useEffect(() => {
		;(async () => {
			try {
				const user = await axios.get<User>(
					`https://finances4u-api.bohr.io/api/user/${userInfo.userId}`
				)
				setUserData(user.data)
				setProfilePic(userData.profilePic ? userData.profilePic : '')
			} catch (error) {}
		})()
	}, [userInfo.userId])

	return (
		<Drawer.Section className='flex-1' showDivider={false}>
			<View className='flex-1'>
				<DrawerContentScrollView
					{...props}
					contentContainerStyle={{
						backgroundColor: colors.white[2],
						height: '100%',
					}}
				>
					<DrawerHeader userData={userData} profilePic={profilePic} />

					{routesConfig.map((route) => (
						<Drawer.Item
							key={`${route.label} to ${route.name}`}
							label={route.label}
							icon={route.icon}
							onPress={() => navigation.navigate(route.name)}
						/>
					))}

					<Drawer.Item
						label='Sair'
						icon='exit-to-app'
						onPress={async () => {
							await userInfo.logout()
							navigation.navigate('LoadingModal', {
								redirect: 'Start',
								title: 'Saindo...',
								barColor: 'red',
							})
						}}
					/>
				</DrawerContentScrollView>
			</View>
		</Drawer.Section>
	)
}

interface DrawerHeaderProps {
	profilePic: string
	userData: User
}

function DrawerHeader(props: DrawerHeaderProps) {
	const { profilePic, userData } = props

	return (
		<View className='w-full h-64 bg-[#fff] px-4 pt-16 pb-8' style={{ gap: 16 }}>
			<View className='flex-row items-center gap-2'>
				<Image
					source={require('../../assets/mini_icon.png')}
					className='w-[48px] h-[48px] rounded-full'
				/>
				<Text variant='titleLarge' style={Oswald.regular}>
					Finanças
				</Text>
			</View>

			<View className='justify-start'>
				<UploadImgButton
					icon='account'
					size={42}
					width={64}
					height={64}
					roundedFull
					pickImage={async () => {}}
					borderColor={colors.black[1]}
				>
					{profilePic}
				</UploadImgButton>

				<Text variant='titleMedium' style={Oswald.medium}>
					{userData.username}
				</Text>

				<Text variant='titleSmall' style={Oswald.light}>
					R${userData.balance}
				</Text>
			</View>
		</View>
	)
}
