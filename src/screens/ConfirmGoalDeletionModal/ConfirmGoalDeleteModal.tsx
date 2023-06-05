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

export function ConfirmGoalDeleteModal() {
	const [user, setUser] = useState<User>()
	const [password, setPassword] = useState('')

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

	const cancelDelete = () => {
		setPassword('')
		navigator.goBack()
	}

	const deleteGoal = async () => {
		if (password == user.password) {
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
		}
	}

	return (
		<StandardModal>
			<DefaultInput
				required
				bold
				secure
				label='Confirme com sua senha'
				onChange={(newText) => setPassword(newText)}
			>
				{password}
			</DefaultInput>

			<ModalStandardButtonsContainer>
				<CustomBigButton width={150} color='red' onPress={cancelDelete}>
					Cancelar
				</CustomBigButton>

				<CustomBigButton
					width={150}
					color='red'
					onPress={async () => await deleteGoal()}
				>
					Excluir
				</CustomBigButton>
			</ModalStandardButtonsContainer>
		</StandardModal>
	)
}
