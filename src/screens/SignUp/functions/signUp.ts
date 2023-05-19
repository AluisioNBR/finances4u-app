import { NavigationProp, ParamListBase } from '@react-navigation/native'
import axios from 'axios'
import { Dispatch } from 'react'
import { userInfo } from '../../../components/userInfo'

export async function signUp(
	username: string,
	email: string,
	password: string,
	passwordConfirm: string,
	cleanFields: () => void,
	setError: Dispatch<string>,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	try {
		if (password != passwordConfirm)
			throw new Error('As senhas estão diferentes!')

		const { data } = await axios.post(
			`https://finances4u-api.bohr.io/api/signup?username=${username}&email=${email}&password=${password}`
		)
		userInfo.userId = data._id
		navigator.navigate('LoadingModal', {
			redirect: 'Home',
			title: 'Cadastrando...',
			duration: 5000,
		})
		await userInfo.setUserId(data._id)
		cleanFields()
	} catch (error) {
		if (error.message.split(' ').at(-1) == '400')
			setError('Este email já está cadastrado!')
		else setError(error.message)
	}
}
