import { Dispatch } from 'react'

export interface EditInputsProps {
	goalName: string
	setGoalName: Dispatch<string>
	goalValue: string
	setGoalValue: Dispatch<string>
	increment: string
	availableIncrement: number
	setIncrement: Dispatch<string>
}
