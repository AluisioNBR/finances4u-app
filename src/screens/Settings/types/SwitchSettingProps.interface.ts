export interface SwitchSettingProps {
	title: string
	children: string
	on?: boolean
	color?: 'green' | 'red' | 'blue'
	onChangeValue: () => void
}
