import { View } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Drawer } from 'react-native-paper'
import { useState, useEffect } from 'react'
import { DefaultUser, User } from '../../@types/data/User.interface'
import axios from 'axios'
import colors from '../../../colors'
import { userInfo } from '../userInfo'
import { MenuDrawerProps } from './types/MenuDrawerProps.interface'
import { routesConfig } from './data/routesConfig'
import { DrawerHeader } from './components/DrawerHeader'

export function MenuDrawer(props: MenuDrawerProps) {
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
