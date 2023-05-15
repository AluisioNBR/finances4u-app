import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import { useState, useEffect, useContext } from 'react'
import { CustomBigButton } from '../../components/CustomBigButton'
import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { User } from '../../@types/data/User.interface'
import axios from 'axios'
import { ConfirmGoalDeleteModalParams } from './types/ConfirmGoalDeleteModalParams.interface'
import { StandardModal } from '../../components/StandardModal'
import { ModalStandardButtonsContainer } from '../../components/ModalStandardButtonsContainer'
import { passwordEncrypter } from '../../components/passwordEncrypter'

export function ConfirmGoalDeleteModal() {
	const [user, setUser] = useState<User>()
	const [password, setPassword] = useState('')
	const [passwordEncrypted, setPasswordEncrypted] = useState('')

	const navigator = useContext(NavigationContext)
	const route = useContext(NavigationRouteContext)
	const { goal, setDateHome } = route.params as ConfirmGoalDeleteModalParams

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
	}, [])

	useEffect(() => {
		;(async () => {
			const { data } = await axios.get<User>(
				`https://finances4u-api.bohr.io/api/user/${goal.owner}`
			)
			setUser(data)
		})()
	}, [goal])

	useEffect(() => {
		let result = ''
		for (let index = 0; index < password.length; index++) result += '*'
		setPasswordEncrypted(result)
	}, [password])

	const cancelDelete = () => {
		setPassword('')
		setPasswordEncrypted('')
		navigator.goBack()
	}

	const deleteGoal = () => {
		if (password == user.password)
			(async () => {
				const { data } = await axios.delete(
					`https://finances4u-api.bohr.io/api/user/${goal.owner}/goals/${goal._id}/delete`
				)
				if (data) {
					setDateHome(new Date())
					navigator.navigate('LoadingModal', {
						redirect: 'Home',
						title: 'Deletando...',
						barColor: 'red',
					})
				}
			})()
	}

	return (
		<StandardModal>
			<DefaultInput
				required
				bold
				label='Confirme com sua senha'
				onChange={(newText) =>
					setPassword((prevState) => passwordEncrypter(prevState, newText))
				}
			>
				{passwordEncrypted}
			</DefaultInput>

			<ModalStandardButtonsContainer>
				<CustomBigButton width={150} color='red' onPress={cancelDelete}>
					Cancelar
				</CustomBigButton>

				<CustomBigButton width={150} color='red' onPress={deleteGoal}>
					Excluir
				</CustomBigButton>
			</ModalStandardButtonsContainer>
		</StandardModal>
	)
}
