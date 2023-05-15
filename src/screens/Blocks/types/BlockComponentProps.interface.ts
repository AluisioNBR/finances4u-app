import { Dispatch } from "react"

export interface BlockComponentProps {
	getAvailableBalance: () => void
	setDate: Dispatch<Date>
	children: string
	value: number
	owner: string
	id: string
	canEdit: boolean
}