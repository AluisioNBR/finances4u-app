import { Dispatch } from 'react'

export interface HomeActionModalParams {
	userId: string
	label1: string
	label2: string
	type: 'block' | 'receive' | 'pay'
	setDate: Dispatch<Date>
	availableBalance?: number
}
