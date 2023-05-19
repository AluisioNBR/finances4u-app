import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { User } from '../@types/data/User.interface'

class UserInfo {
	userId: string
	profilePic: string
	balance: number

	constructor() {
		;(async () => {
			try {
				const id = await AsyncStorage.getItem('userId')
				if (id) {
					this.userId = id
					const { data } = await axios.get<User>(
						`https://finances4u-api.bohr.io/api/user/${id}`
					)
					this.profilePic = data.profilePic
					this.balance = data.balance
				} else {
					this.userId = ''
					this.profilePic = ''
					this.balance = 0
				}
			} catch (error) {
				this.userId = ''
				this.profilePic = ''
				this.balance = 0
			}
		})()
	}

	async setUserId(userId: string) {
		this.userId = userId
		await AsyncStorage.setItem('userId', userId)
		return this.userId
	}

	async logout() {
		await AsyncStorage.removeItem('userId')
		this.userId = ''
		this.profilePic = ''
		this.balance = 0
	}
}

export let userInfo = new UserInfo()
