import { NavigationProp, ParamListBase } from '@react-navigation/native'
import axios from 'axios'
import { Dispatch } from 'react'

export async function signUp(
	username: string,
	email: string,
	password: string,
	passwordConfirm: string,
	cleanFields: () => void,
	setUserId: (userId: string) => Promise<void>,
	setError: Dispatch<string>,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	try {
		if (password != passwordConfirm)
			throw new Error('As senhas estão diferentes!')

		const { data } = await axios.post(
			`https://finances4u-api.bohr.io/api/signup?username=${username}&email=${email}&password=${password}`
		)
		navigator.navigate('LoadingModal', {
			redirect: 'Home',
			title: 'Cadastrando...',
			duration: 5000,
		})
		await setUserId(data._id)
		cleanFields()
	} catch (error) {
		setError(error.message)
	}
}
