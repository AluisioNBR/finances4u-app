import { Dispatch } from 'react'

export interface SettingsModalParams {
	userId: string
	action: 'changeName' | 'deleteAccount'
	userPassword: string
	setDate: Dispatch<Date>
}
