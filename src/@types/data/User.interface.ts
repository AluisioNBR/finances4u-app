export interface User {
	profilePic: string
	_id: string
	username: string
	email: string
	password: string
	balance: number
	incrementRateAvailable: number
	incomes: number
	expenses: number
	isAdm: boolean
	accountConfig: {
		autoIncrement: boolean
		blocksEdit: boolean
		_id: string
	}
	__v: number
}

export const DefaultUser = {
	profilePic: '',
	_id: '',
	username: 'User',
	email: 'defaultuser@user.com',
	password: '0000000000000000',
	balance: 0,
	incrementRateAvailable: 100,
	incomes: 0,
	expenses: 0,
	isAdm: false,
	accountConfig: {
		autoIncrement: true,
		blocksEdit: false,
		_id: '',
	},
	__v: 0,
} as User
