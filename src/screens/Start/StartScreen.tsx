import { NavigationContext } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useContext, useEffect } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { BigGreenButton } from '../../components/BigGreenButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Oswald } from '../../styles/Oswald.font'

export function StartScreen() {
	const navigator = useContext(NavigationContext)

	useEffect(() => {
		;(async () => {
			const userId = await AsyncStorage.getItem('userId')
			if (userId != null) navigator.navigate('Home')
		})()
	}, [])

	const goToSignIn = useCallback(() => {
		navigator.navigate('SignIn')
	}, [])

	const goToSignUp = useCallback(() => {
		navigator.navigate('SignUp')
	}, [])

	return (
		<View className='flex-1 items-center justify-evenly'>
			<StatusBar
				hideTransitionAnimation='slide'
				hidden={true}
				animated={true}
				style='auto'
			/>
			<Text
				variant='displayMedium'
				className='text-center'
				style={Oswald.regular}
			>
				{`Bem vindo ao\nFinanças 4U!`}
			</Text>

			<View className='w-[231px] h-[236px] justify-between'>
				<Text
					variant='headlineLarge'
					className='text-center'
					style={Oswald.regular}
				>
					{`Está pronto\npara começar ?`}
				</Text>

				<BigGreenButton onPress={goToSignIn}>Entrar</BigGreenButton>

				<BigGreenButton onPress={goToSignUp}>Cadastrar</BigGreenButton>
			</View>
		</View>
	)
}
