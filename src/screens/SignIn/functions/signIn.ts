import { NavigationProp, ParamListBase } from '@react-navigation/native'
import axios from 'axios'
import { User } from '../../../@types/data/User.interface'

export async function signIn(
	username: string,
	password: string,
	setUserId: (userId: string) => Promise<void>,
	cleanFields: () => void,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	try {
		const { data } = await axios.post<User>(
			`https://finances4u-api.bohr.io/api/signin?username=${username}&password=${password}`
		)
		navigator.navigate('LoadingModal', {
			redirect: 'Home',
			title: 'Logando...',
			duration: 5000,
		})
		await setUserId(data._id)
		cleanFields()
	} catch (error) {
		console.log(error)
	}
}
