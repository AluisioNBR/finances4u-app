import { View } from 'react-native'
import { DefaultInput } from '../../components/DefaultInput'
import { useState, useEffect, useContext, Dispatch } from 'react'
import { CustomBigButton } from '../../components/CustomBigButton'
import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { Goal } from '../../@types/data/Goal.interface'
import { User } from '../../@types/data/User.interface'
import axios from 'axios'

interface ConfirmGoalDeleteModalParams {
	goal: Goal
	setDateHome: Dispatch<Date>
}

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

	return (
		<View className='flex-1 items-center justify-center bg-[#0005]'>
			<View className='gap-4 bg-white-1 p-5 w-[95%] rounded-3xl justify-between'>
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
					{passwordEncrypted}
				</DefaultInput>

				<View className='mt-3 flex-row justify-evenly w-full'>
					<CustomBigButton
						width={150}
						color='red'
						onPress={() => {
							setPassword('')
							setPasswordEncrypted('')
							navigator.goBack()
						}}
					>
						Cancelar
					</CustomBigButton>

					<CustomBigButton
						width={150}
						color='red'
						onPress={() => {
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
						}}
					>
						Excluir
					</CustomBigButton>
				</View>
			</View>
		</View>
	)
}
