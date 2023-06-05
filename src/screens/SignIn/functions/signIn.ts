import { NavigationProp, ParamListBase } from '@react-navigation/native'
import axios from 'axios'
import { User } from '../../../@types/data/User.interface'
import { userInfo } from '../../../components/userInfo'
import { Dispatch } from 'react'

export async function signIn(
	username: string,
	password: string,
	setError: Dispatch<string>,
	cleanFields: () => void,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	try {
		const { data } = await axios.post<User>(
			`https://finances4u-api.bohr.io/api/signin?username=${username}&password=${password}`
		)
		userInfo.userId = data._id
		await userInfo.setUserId(data._id)
		navigator.navigate('LoadingModal', {
			redirect: 'Home',
			title: 'Logando...',
			duration: 5000,
		})
		cleanFields()
	} catch (error) {
		const errObj = error.toJSON()
		if (errObj.code == 'ERR_BAD_REQUEST')
			setError('Este usuário não está cadastrado!')
		else setError('Algo deu errado, por favor tente novamente!')
	}
}
