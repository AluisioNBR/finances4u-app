import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContext } from '@react-navigation/native'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { BigGreenButton } from '../../components/BigGreenButton'
import { DefaultInput } from '../../components/DefaultInput'
import { NavLink } from '../../components/NavLink'
import { User } from '../../@types/data/User.interface'
import { Oswald } from '../../styles/Oswald.font'

export function SignInScreen() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [passwordEncrypted, setPasswordEncrypted] = useState('')
	const navigator = useContext(NavigationContext)

	const cleanFields = () => {
		setUsername('')
		setPassword('')
	}

	const signIn = async () => {
		try {
			const { data } = await axios.post<User>(
				`https://finances4u-api.bohr.io/api/signin?username=${username}&password=${password}`
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

	return (
		<View className='flex-1 items-center justify-between gap-8 px-2 py-4'>
			<StatusBar style='inverted' />
			<View className='flex-row items-center'>
				<IconButton
					icon='keyboard-return'
					className='absolute left-[-160px] bg-gray-1 w-11 h-11'
					onPress={() => {
						navigator.goBack()
						cleanFields()
					}}
				/>

				<Text variant='headlineLarge' style={Oswald.regular}>
					Login
				</Text>
			</View>

			<KeyboardAvoidingView className='w-[85%] h-[200px] justify-between'>
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
			</KeyboardAvoidingView>

			<View className='justify-between gap-8 w-[85%] h-32'>
				<BigGreenButton onPress={signIn}>Login</BigGreenButton>

				<NavLink
					onPress={() => {
						navigator.navigate('SignUp')
						cleanFields()
					}}
				>
					Não possui uma conta ? Cadastre-se aqui!
				</NavLink>
			</View>
		</View>
	)
}
