import { useState, Dispatch, useEffect } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { useContext } from 'react'
import { CustomBigButton } from '../../components/CustomBigButton'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import { Oswald } from '../../styles/Oswald.font'
import axios from 'axios'
import { User } from '../../@types/data/User.interface'
import { userInfo } from '../../components/userInfo'

interface SettingsModalParams {
	userId: string
	action: 'changeName' | 'deleteAccount'
	userPassword: string
	setDate: Dispatch<Date>
}

export function SettingsModal() {
	const navigator = useContext(NavigationContext)
	const { params } = useContext(NavigationRouteContext)
	const { userId, action, userPassword, setDate } =
		params as SettingsModalParams

	const [newUsername, setNewUsername] = useState('')
	const [password, setPassword] = useState('')
	const [passwordEncrypt, setPasswordEncrypted] = useState('')
	const [error, setError] = useState('')

	const cleanFields = () => {
		setNewUsername('')
		setPassword('')
		setPasswordEncrypted('')
		setError('')
	}

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
	}, [])

	useEffect(() => {
		let result = ''
		for (let index = 0; index < password.length; index++) result += '*'
		setPasswordEncrypted(result)
	}, [password])

	return (
		<View className='flex-1 items-center justify-center bg-[#0005]'>
			<View className='absolute left-6 gap-4 bg-white-1 p-5 w-[96%] rounded-3xl justify-between'>
				{action == 'changeName' ? (
					<DefaultInput
						required
						bold
						label='Qual será o novo nome de usuário ?'
						onChange={(newValue) => setNewUsername(newValue)}
					>
						{newUsername}
					</DefaultInput>
				) : null}

				<DefaultInput
					required
					bold
					label='Confirme com sua senha'
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
					{passwordEncrypt}
				</DefaultInput>

				{error == '' ? null : (
					<Text className='text-center text-red-1' style={Oswald.bold}>
						{error}
					</Text>
				)}

				<View className='mt-3 flex-row justify-evenly w-[325px]'>
					<CustomBigButton
						width={150}
						color='red'
						onPress={() => {
							cleanFields()
							navigator.goBack()
						}}
					>
						Cancelar
					</CustomBigButton>

					<CustomBigButton
						width={150}
						color={action == 'changeName' ? 'blue' : 'red'}
						onPress={async () => {
							try {
								if (password != userPassword)
									throw new Error('Senha incorreta!')

								navigator.navigate('LoadingModal', {
									redirect: action == 'changeName' ? 'Settings' : 'Start',
									barColor: action == 'changeName' ? 'blue' : 'red',
									title:
										action == 'changeName' ? 'Alterando...' : 'Deletando...',
								})

								if (action == 'changeName') {
									if (newUsername == '')
										throw new Error(
											'Por favor, informe um novo nome de usuário!'
										)
									await axios.patch(
										`https://finances4u-api.bohr.io/api/user/${userId}/change/username/${newUsername}`
									)
								} else {
									await axios.delete<User>(
										`https://finances4u-api.bohr.io/api/user/${userId}/delete/`
									)
									await userInfo.logout()
								}

								setDate(new Date())
							} catch (error) {
								setError(error.message)
							}
						}}
					>
						Confirmar
					</CustomBigButton>
				</View>
			</View>
		</View>
	)
}
