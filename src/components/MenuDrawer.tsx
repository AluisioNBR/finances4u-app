import { useState } from 'react'
import { View } from 'react-native'

import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer'
import { HomeScreen } from '../screens/Home/HomeScreen'
import { StartScreen } from '../screens/Start/StartScreen'

const Drawer = createDrawerNavigator()

export function MenuDrawer() {
	const [active, setActive] = useState(false)

	return (
		<View style={{ flex: 1, backgroundColor: '#0005' }}>
			<Drawer.Navigator
				id='MenuDrawer'
				screenOptions={{ headerShown: false }}
				drawerContent={(props) => <CustomDrawer {...props} />}
			>
				<Drawer.Screen name='Início' component={HomeScreen} />
				<Drawer.Screen name='Sair' component={StartScreen} />
			</Drawer.Navigator>
		</View>
	)
}

function CustomDrawer(props) {
	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView
				{...props}
				contentContainerStyle={{ backgroundColor: '#fff' }}
			>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>
		</View>
	)
}
