import AsyncStorage from '@react-native-async-storage/async-storage'

class UserInfo {
	userId: string

	constructor() {
		;(async () => {
			try {
				const id = await AsyncStorage.getItem('userId')
				this.userId = id ? id : ''
			} catch (error) {
				this.userId = ''
			}
		})()
	}

	async setUserId(userId: string) {
		this.userId = userId
		await AsyncStorage.setItem('userId', userId)
	}

	async logout() {
		await AsyncStorage.removeItem('userId')
		this.userId = ''
	}
}

export let userInfo = new UserInfo()
