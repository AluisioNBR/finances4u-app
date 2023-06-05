import { NavigationProp, ParamListBase } from '@react-navigation/native'
import axios from 'axios'
import { Dispatch } from 'react'
import { User } from '../../../@types/data/User.interface'
import { userInfo } from '../../../components/userInfo'

export async function confirmAction(
	userId: string,
	newUsername: string,
	password: string,
	userPassword: string,
	action: 'changeName' | 'deleteAccount',
	setError: Dispatch<string>,
	setDate: Dispatch<Date>,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	try {
		if (password != userPassword) throw new Error('Senha incorreta!')

		if (action == 'changeName') {
			if (newUsername == '')
				throw new Error('Por favor, informe um novo nome de usuário!')
			await axios.patch(
				`https://finances4u-api.bohr.io/api/user/${userId}/change/username/${newUsername}`
			)
		} else
			await Promise.all([
				axios.delete<User>(
					`https://finances4u-api.bohr.io/api/user/${userId}/delete/`
				),
				userInfo.logout(),
			])

		navigator.navigate('Start')

		setDate(new Date())
	} catch (error) {
		setError(error.message)
	}
}
