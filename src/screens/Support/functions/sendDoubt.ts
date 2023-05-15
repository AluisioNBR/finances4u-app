import { NavigationProp, ParamListBase } from '@react-navigation/native'
import axios from 'axios'
import { Dispatch } from 'react'
import { Doubt } from '../../../@types/data/Doubt.interface'
import { userInfo } from '../../../components/userInfo'

export async function sendDoubt(
	customDoubt: string,
	setCustomDoubt: Dispatch<string>,
	setError: Dispatch<string>,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	try {
		if (customDoubt == '')
			throw new Error('Não é possível enviar uma dúvida vazia!')
		navigator.navigate('LoadingModal', {
			redirect: 'Support',
			title: 'Enviando...',
		})
		await axios.post<Doubt>(
			`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/support/send/doubt?doubt=${customDoubt}`
		)
		setCustomDoubt('')
		setError('')
	} catch (error) {
		setError(error.message)
	}
}
