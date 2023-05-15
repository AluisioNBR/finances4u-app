import { NavigationProp, ParamListBase } from '@react-navigation/native'
import axios from 'axios'
import { Dispatch } from 'react'
import { Sugestion } from '../../../@types/data/Sugestion.interface'
import { userInfo } from '../../../components/userInfo'

export async function sendSugestion(
	title: string,
	sugestion: string,
	cleanFields: () => void,
	setError: Dispatch<string>,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	try {
		if (title == '' || sugestion == '')
			throw new Error('O título e a descrição não podem estar vazios!')
		navigator.navigate('LoadingModal', {
			redirect: 'Sugestions',
			title: 'Enviando...',
		})
		await axios.post<Sugestion>(
			`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/support/send/sugestion/?title=${title}&body=${sugestion}`
		)
		cleanFields()
	} catch (e) {
		setError(e.message)
	}
}
