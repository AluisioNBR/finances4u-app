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
		await userInfo.setUserId(data._id)
		navigator.navigate('LoadingModal', {
			redirect: 'Home',
			title: 'Cadastrando...',
			duration: 5000,
		})
		cleanFields()
	} catch (error) {
		const errObj = error.toJSON()
		if (errObj.code == 'ERR_BAD_REQUEST')
			setError('Este email já está cadastrado!')
		else setError('Algo deu errado, por favor tente novamente!')
	}
}
