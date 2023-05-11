import { NavigationContext } from '@react-navigation/native'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { BigGreenButton } from '../../components/BigGreenButton'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import { NavLink } from '../../components/NavLink'
import { User } from '../../@types/data/User.interface'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'
import { userInfo } from '../../components/userInfo'

export function SignInScreen() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [passwordEncrypted, setPasswordEncrypted] = useState('')
	const navigator = useContext(NavigationContext)

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
	}, [])

	const cleanFields = () => {
		setUsername('')
		setPassword('')
	}

	const signIn = async () => {
		try {
			const { data } = await axios.post<User>(
				`https://finances4u-api.bohr.io/api/signin?username=${username}&password=${password}`
			)
			navigator.navigate('LoadingModal', {
				redirect: 'Home',
				title: 'Logando...',
				duration: 5000,
			})
			await userInfo.setUserId(data._id)
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
		<StandardScreen pos='between'>
			<StandardHeader noMenu buttonPos={-170} callback={cleanFields}>
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

			<View className='items-center justify-between w-full h-32'>
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
		</StandardScreen>
	)
}
