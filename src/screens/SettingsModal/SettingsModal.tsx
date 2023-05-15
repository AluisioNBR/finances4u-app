import { useState, useEffect } from 'react'
import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { useContext } from 'react'
import { CustomBigButton } from '../../components/CustomBigButton'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import { SettingsModalParams } from './types/SettingsModalParams.interface'
import { StandardModal } from '../../components/StandardModal'
import { ModalStandardButtonsContainer } from '../../components/ModalStandardButtonsContainer'
import { passwordEncrypter } from '../../components/passwordEncrypter'
import { ErrorMsg } from '../../components/ErrorMsg'
import { confirmAction } from './functions/confirmAction'

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
		<StandardModal>
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
					setPassword((prevState) => passwordEncrypter(prevState, newText))
				}
			>
				{passwordEncrypt}
			</DefaultInput>

			<ErrorMsg>{error}</ErrorMsg>

			<ModalStandardButtonsContainer>
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
					onPress={async () =>
						await confirmAction(
							userId,
							newUsername,
							password,
							userPassword,
							action,
							setError,
							setDate,
							navigator
						)
					}
				>
					Confirmar
				</CustomBigButton>
			</ModalStandardButtonsContainer>
		</StandardModal>
	)
}
