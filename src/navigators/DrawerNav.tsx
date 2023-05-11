import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreen } from '../screens/Home/HomeScreen'
import { BlocksScreen } from '../screens/Blocks/BlocksScreen'
import { SettingsScreen } from '../screens/Settings/SettingsScreen'
import { SupportScreen } from '../screens/Support/SupportScreen'
import { SugestionsScreen } from '../screens/Sugestions/SugestionsScreen'
import { AboutScreen } from '../screens/About/AboutScreen'
import { LoadingModal } from '../screens/LoadingModal/LoadingModal'
import { MenuDrawer } from '../components/MenuDrawer/MenuDrawer'
import { StackNav } from './StackNav'

const Drawer = createDrawerNavigator()

export function DrawerNav() {
	return (
		<Drawer.Navigator
			id='MenuDrawer'
			screenOptions={{ headerShown: false }}
			drawerContent={(props) => <MenuDrawer {...props} />}
		>
			<Drawer.Screen name='StackNav' component={StackNav} />
			<Drawer.Screen name='Início' component={HomeScreen} />
			<Drawer.Screen name='Bloqueios' component={BlocksScreen} />
			<Drawer.Screen name='Configurações' component={SettingsScreen} />
			<Drawer.Screen name='Suporte' component={SupportScreen} />
			<Drawer.Screen name='Sugestão' component={SugestionsScreen} />
			<Drawer.Screen name='Sobre' component={AboutScreen} />
			<Drawer.Screen name='LoadingModal' component={LoadingModal} />
		</Drawer.Navigator>
	)
}
