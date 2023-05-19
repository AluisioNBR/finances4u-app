import { NavigationProp, ParamListBase } from '@react-navigation/native'
import axios from 'axios'
import { User } from '../../../@types/data/User.interface'
import { userInfo } from '../../../components/userInfo'

export async function signIn(
	username: string,
	password: string,
	cleanFields: () => void,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	try {
		const { data } = await axios.post<User>(
			`https://finances4u-api.bohr.io/api/signin?username=${username}&password=${password}`
		)
		userInfo.userId = data._id
		navigator.navigate('LoadingModal', {
			redirect: 'Home',
			title: 'Logando...',
			duration: 5000,
		})
		await userInfo.setUserId(data._id)
		cleanFields()
	} catch (error) {
		console.log(error)
	}
}
