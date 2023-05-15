import { NavigationContext } from '@react-navigation/native'
import { useContext, useState, useEffect } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { BigGreenButton } from '../../components/BigGreenButton'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import { NavLink } from '../../components/NavLink'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'
import { userInfo } from '../../components/userInfo'
import { signUp } from './functions/signUp'
import { ErrorMsg } from '../../components/ErrorMsg'
import { passwordEncrypter } from '../../components/passwordEncrypter'

export function SignUpScreen() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordEncrypted, setPasswordEncrypted] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')
	const [passwordConfirmEncrypted, setPasswordConfirmEncrypted] = useState('')
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

	useEffect(() => {
		let result = ''
		for (let index = 0; index < password.length; index++) result += '*'
		setPasswordEncrypted(result)
	}, [password])

	useEffect(() => {
		let result = ''
		for (let index = 0; index < passwordConfirm.length; index++) result += '*'
		setPasswordConfirmEncrypted(result)
	}, [passwordConfirm])

	return (
		<StandardScreen pos='between'>
			<StandardHeader noMenu callback={cleanFields} buttonPos={-150}>
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
					onChange={(newText) =>
						setPassword((prevState) => passwordEncrypter(prevState, newText))
					}
				>
					{passwordEncrypted}
				</DefaultInput>

				<DefaultInput
					label='Repita sua Senha'
					required
					onChange={(newText) =>
						setPasswordConfirm((prevState) =>
							passwordEncrypter(prevState, newText)
						)
					}
				>
					{passwordConfirmEncrypted}
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
							userInfo.setUserId,
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
