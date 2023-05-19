import { Dispatch } from 'react'
import { Goal } from '../../../@types/data/Goal.interface'
import { User } from '../../../@types/data/User.interface'

export interface GoalsViewerProps {
	children: Goal[]
	user: User
	setDate: Dispatch<Date>
}
