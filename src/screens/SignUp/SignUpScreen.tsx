import { NavigationContext } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { useContext, useState, useEffect } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { BigGreenButton } from '../../components/BigGreenButton'
import { DefaultInput } from '../../components/DefaultInput'
import { NavLink } from '../../components/NavLink'
import { Oswald } from '../../styles/Oswald.font'

export function SignUpScreen() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordEncrypted, setPasswordEncrypted] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')
	const [passwordConfirmEncrypted, setPasswordConfirmEncrypted] = useState('')
	const navigator = useContext(NavigationContext)

	const cleanFields = () => {
		setUsername('')
		setEmail('')
		setPassword('')
		setPasswordConfirm('')
	}

	const signUp = async () => {
		try {
			if (password != passwordConfirm)
				throw new Error('Password are different!')

			const { data } = await axios.post(
				`https://finances4u-api.bohr.io/api/signup?username=${username}&email=${email}&password=${password}`
			)
			await AsyncStorage.setItem('userId', data._id)
			navigator.navigate('Home')
			cleanFields()
		} catch (error) {
			console.log(error)
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
		<View className='flex-1 items-center justify-between gap-8 px-2 py-4'>
			<StatusBar style='inverted' />
			<View className='flex-row items-center'>
				<IconButton
					icon='keyboard-return'
					className='absolute left-[-140px] bg-gray-1 w-11 h-11'
					onPress={() => {
						navigator.goBack()
						cleanFields()
					}}
				/>

				<Text variant='headlineLarge' style={Oswald.regular}>
					Cadastro
				</Text>
			</View>

			<KeyboardAvoidingView
				behavior='padding'
				className='w-[85%] h-[500px] justify-between'
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
			</KeyboardAvoidingView>

			<View className='justify-between gap-8 w-[85%] h-32'>
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
		</View>
	)
}
