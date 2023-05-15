export interface SettingActionButtonProps {
	color?: 'green' | 'red' | 'blue'
	title: string
	children: string | JSX.Element
	action: 'changeName' | 'deleteAccount'
	userId: string
	password: string
}
