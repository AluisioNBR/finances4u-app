import { NavigationContext } from '@react-navigation/native'
import { useContext, useState, useEffect } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { BigGreenButton } from '../../components/BigGreenButton'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import { NavLink } from '../../components/NavLink'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'
import { signUp } from './functions/signUp'
import { ErrorMsg } from '../../components/ErrorMsg'

export function SignUpScreen() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')
	const [error, setError] = useState('')
	const navigator = useContext(NavigationContext)

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
	}, [])

	const cleanFields = () => {
		setUsername('')
		setEmail('')
		setPassword('')
		setPasswordConfirm('')
		setError('')
	}

	const goToSignIn = () => {
		navigator.navigate('SignIn')
		cleanFields()
	}

	return (
		<StandardScreen pos='between'>
			<StandardHeader noMenu callback={cleanFields}>
				Cadastro
			</StandardHeader>

			<KeyboardAvoidingView
				behavior='padding'
				className='w-full h-[500px] justify-between'
			>
				<DefaultInput
					label='Nome de Usuário'
					required
					onChange={(newText) => setUsername(newText)}
				>
					{username}
				</DefaultInput>

				<DefaultInput
					label='Email'
					required
					onChange={(newText) => setEmail(newText)}
				>
					{email}
				</DefaultInput>

				<DefaultInput
					label='Senha'
					required
					secure
					onChange={(newText) => setPassword(newText)}
				>
					{password}
				</DefaultInput>

				<DefaultInput
					label='Repita sua Senha'
					required
					secure
					onChange={(newText) => setPasswordConfirm(newText)}
				>
					{passwordConfirm}
				</DefaultInput>

				<ErrorMsg>{error}</ErrorMsg>
			</KeyboardAvoidingView>

			<View className='justify-between w-full h-32'>
				<BigGreenButton
					onPress={async () =>
						await signUp(
							username,
							email,
							password,
							passwordConfirm,
							cleanFields,
							setError,
							navigator
						)
					}
				>
					Cadastro
				</BigGreenButton>

				<NavLink onPress={goToSignIn}>
					Já possui uma conta ? Faça login aqui!
				</NavLink>
			</View>
		</StandardScreen>
	)
}
