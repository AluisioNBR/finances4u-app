import { NavigationContext } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useContext, useEffect } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { BigGreenButton } from '../../components/BigGreenButton'
import { Oswald } from '../../styles/Oswald.font'
import { StandardScreen } from '../../components/StandardScreen'
import { userInfo } from '../../components/userInfo'

export function StartScreen() {
	const navigator = useContext(NavigationContext)

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })

		if (userInfo.userId != '') navigator.navigate('Home')
	}, [])

	const goToSignIn = useCallback(() => {
		navigator.navigate('SignIn')
	}, [])

	const goToSignUp = useCallback(() => {
		navigator.navigate('SignUp')
	}, [])

	return (
		<StandardScreen pos='center'>
			<StatusBar
				hideTransitionAnimation='slide'
				hidden={true}
				animated={true}
				style='inverted'
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
					variant='headlineMedium'
					className='text-center'
					style={Oswald.regular}
				>
					{`Está pronto\npara começar ?`}
				</Text>

				<BigGreenButton onPress={goToSignIn}>Entrar</BigGreenButton>

				<BigGreenButton onPress={goToSignUp}>Cadastrar</BigGreenButton>
			</View>
		</StandardScreen>
	)
}
