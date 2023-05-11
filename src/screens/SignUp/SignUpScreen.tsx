import { NavigationContext } from '@react-navigation/native'
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { BigGreenButton } from '../../components/BigGreenButton'
import { DefaultInput } from '../../components/DefaultInput'
import { NavLink } from '../../components/NavLink'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader'
import { Text } from 'react-native-paper'
import { Oswald } from '../../styles/Oswald.font'
import { userInfo } from '../../components/userInfo'

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

	const signUp = async () => {
		try {
			if (password != passwordConfirm)
				throw new Error('As senhas estão diferentes!')

			const { data } = await axios.post(
				`https://finances4u-api.bohr.io/api/signup?username=${username}&email=${email}&password=${password}`
			)
			navigator.navigate('LoadingModal', {
				redirect: 'Home',
				title: 'Cadastrando...',
				duration: 5000,
			})
			await userInfo.setUserId(data._id)
			cleanFields()
		} catch (error) {
			setError(error.message)
		}
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
						setPassword((prevState) => {
							let finalPassword = ''
							for (const iterator of newText) {
								if (iterator == '*') continue
								finalPassword = prevState + iterator
							}
							return finalPassword
						})
					}
				>
					{passwordEncrypted}
				</DefaultInput>

				<DefaultInput
					label='Repita sua Senha'
					required
					onChange={(newText) =>
						setPasswordConfirm((prevState) => {
							let finalPassword = ''
							for (const iterator of newText) {
								if (iterator == '*') continue
								finalPassword = prevState + iterator
							}
							return finalPassword
						})
					}
				>
					{passwordConfirmEncrypted}
				</DefaultInput>

				{!error ? null : (
					<Text className='text-xl text-red-1' style={Oswald.regular}>
						{error}
					</Text>
				)}
			</KeyboardAvoidingView>

			<View className='justify-between w-full h-32'>
				<BigGreenButton onPress={signUp}>Cadastro</BigGreenButton>

				<NavLink
					onPress={() => {
						navigator.navigate('SignIn')
						cleanFields()
					}}
				>
					Já possui uma conta ? Faça login aqui!
				</NavLink>
			</View>
		</StandardScreen>
	)
}
