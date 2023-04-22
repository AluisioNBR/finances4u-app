import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
	DefaultTheme,
	Provider as PaperProvider,
	useTheme,
} from 'react-native-paper'
import {
	useFonts,
	Oswald_200ExtraLight,
	Oswald_300Light,
	Oswald_400Regular,
	Oswald_500Medium,
	Oswald_600SemiBold,
	Oswald_700Bold,
} from '@expo-google-fonts/oswald'
import * as SplashScreen from 'expo-splash-screen'
import { SignInScreen } from './src/screens/SignIn/SignInScreen'
import { SignUpScreen } from './src/screens/SignUp/SignUpScreen'
import { StartScreen } from './src/screens/Start/StartScreen'
import { StatementScreen } from './src/screens/StatementScreen/StatementScreen'
import { GoalCreationScreen } from './src/screens/GoalCreation/GoalCreationScreen'
import { GoalDetailsScreen } from './src/screens/GoalDetails/GoalDetailsScreen'
import { HomeScreen } from './src/screens/Home/HomeScreen'
import { BlocksScreen } from './src/screens/Blocks/BlocksScreen'
import { SettingsScreen } from './src/screens/Settings/SettingsScreen'
import { SupportScreen } from './src/screens/Support/SupportScreen'
import { SugestionsScreen } from './src/screens/Sugestions/SugestionsScreen'
import { AboutScreen } from './src/screens/About/AboutScreen'
import { useEffect } from 'react'
import { HomeActionModal } from './src/screens/HomeActionModal/HomeActionModal'
import { LoadingModal } from './src/screens/LoadingModal/LoadingModal'
import { GoalActionModal } from './src/screens/GoalActionModal/GoalActionModal'
import { ConfirmGoalDeleteModal } from './src/screens/ConfirmGoalDeletionModal/ConfirmGoalDeleteModal'
import { MenuDrawer } from './src/components/MenuDrawer'

const Stack = createNativeStackNavigator()

export const useAppTheme = () => useTheme<typeof DefaultTheme>()

SplashScreen.preventAutoHideAsync()

export default function App() {
	const [fontsLoaded] = useFonts({
		Oswald_200: Oswald_200ExtraLight,
		Oswald_300: Oswald_300Light,
		Oswald_400: Oswald_400Regular,
		Oswald_500: Oswald_500Medium,
		Oswald_600: Oswald_600SemiBold,
		Oswald_700: Oswald_700Bold,
	})

	useEffect(() => {
		;(async () => {
			if (fontsLoaded) await SplashScreen.hideAsync()
		})()
	}, [fontsLoaded])

	if (!fontsLoaded) {
		return null
	}

	return (
		<PaperProvider theme={DefaultTheme}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Group>
						<Stack.Screen name='Start' component={StartScreen} />
						<Stack.Screen name='Home' component={HomeScreen} />
						<Stack.Screen name='GoalDetails' component={GoalDetailsScreen} />
						<Stack.Screen name='Statement' component={StatementScreen} />
						<Stack.Screen name='Blocks' component={BlocksScreen} />
						<Stack.Screen name='Settings' component={SettingsScreen} />
						<Stack.Screen name='Support' component={SupportScreen} />
						<Stack.Screen name='Sugestions' component={SugestionsScreen} />
						<Stack.Screen name='About' component={AboutScreen} />
					</Stack.Group>
					<Stack.Group screenOptions={{ presentation: 'modal' }}>
						<Stack.Screen name='SignUp' component={SignUpScreen} />
						<Stack.Screen name='SignIn' component={SignInScreen} />
						<Stack.Screen name='GoalCreation' component={GoalCreationScreen} />
						<Stack.Screen name='LoadingModal' component={LoadingModal} />
					</Stack.Group>
					<Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
						<Stack.Screen
							name='HomeActionModal'
							initialParams={{
								label1: 'Dê um nome para seu bloqueio',
								label2: 'Quanto irá bloquear ?',
								showAvailableBalance: true,
								type: 'block',
							}}
							component={HomeActionModal}
						/>
						<Stack.Screen name='GoalActionModal' component={GoalActionModal} />
						<Stack.Screen
							name='ConfirmGoalDeleteModal'
							component={ConfirmGoalDeleteModal}
						/>
						<Stack.Screen
							name='MenuDrawer'
							navigationKey='MenuDrawer'
							component={MenuDrawer}
						/>
					</Stack.Group>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	)
}
