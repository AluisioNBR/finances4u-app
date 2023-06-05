import { NavigationContext } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { BigGreenButton } from '../../components/BigGreenButton'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import { NavLink } from '../../components/NavLink'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'
import { signIn } from './functions/signIn'
import { ErrorMsg } from '../../components/ErrorMsg'
import colors from '../../../colors'

export function SignInScreen() {
	const [isLoading, setIsLoading] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigator = useContext(NavigationContext)

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
	}, [])

	const cleanFields = () => {
		setUsername('')
		setPassword('')
	}

	const goToSignUp = () => {
		navigator.navigate('SignUp')
		cleanFields()
	}

	return (
		<StandardScreen pos='between'>
			<StandardHeader noMenu callback={cleanFields}>
				Login
			</StandardHeader>

			<KeyboardAvoidingView className='w-full h-[200px] justify-between'>
				<DefaultInput
					label='Nome de Usuário'
					required
					onChange={(newText) => setUsername(newText)}
				>
					{username}
				</DefaultInput>

				<DefaultInput
					label='Senha'
					required
					secure
					onChange={(newText) => setPassword(newText)}
				>
					{password}
				</DefaultInput>

				<ErrorMsg>{error}</ErrorMsg>
			</KeyboardAvoidingView>

			<View className='items-center justify-between w-full h-32'>
				<BigGreenButton
					onPress={async () => {
						setIsLoading(true)
						await signIn(username, password, setError, cleanFields, navigator)
						setIsLoading(false)
					}}
				>
					{isLoading ? (
						<ActivityIndicator
							animating={true}
							size={30}
							color={colors.white[1]}
						/>
					) : (
						'Login'
					)}
				</BigGreenButton>

				<NavLink onPress={goToSignUp}>
					Não possui uma conta ? Cadastre-se aqui!
				</NavLink>
			</View>
		</StandardScreen>
	)
}
