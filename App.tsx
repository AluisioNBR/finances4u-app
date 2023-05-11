import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import {
	DefaultTheme,
	Provider as PaperProvider,
	useTheme,
} from 'react-native-paper'
import { useFonts } from '@expo-google-fonts/oswald'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { fontsToUse } from './src/components/fontsToUse'
import { DrawerNav } from './src/navigators/DrawerNav'

export const useAppTheme = () => useTheme<typeof DefaultTheme>()

SplashScreen.preventAutoHideAsync()

export default function App() {
	const [fontsLoaded] = useFonts(fontsToUse)

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
				<DrawerNav />
			</NavigationContainer>
		</PaperProvider>
	)
}
