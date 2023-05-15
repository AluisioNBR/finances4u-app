import { NavigationContext } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { BigGreenButton } from '../../components/BigGreenButton'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import { NavLink } from '../../components/NavLink'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'
import { userInfo } from '../../components/userInfo'
import { signIn } from './functions/signIn'
import { passwordEncrypter } from '../../components/passwordEncrypter'

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

	const goToSignUp = () => {
		navigator.navigate('SignUp')
		cleanFields()
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
						setPassword((prevState) => passwordEncrypter(prevState, newText))
					}
				>
					{passwordEncrypted}
				</DefaultInput>
			</KeyboardAvoidingView>

			<View className='items-center justify-between w-full h-32'>
				<BigGreenButton
					onPress={async () =>
						await signIn(
							username,
							password,
							userInfo.setUserId,
							cleanFields,
							navigator
						)
					}
				>
					Login
				</BigGreenButton>

				<NavLink onPress={goToSignUp}>
					Não possui uma conta ? Cadastre-se aqui!
				</NavLink>
			</View>
		</StandardScreen>
	)
}
