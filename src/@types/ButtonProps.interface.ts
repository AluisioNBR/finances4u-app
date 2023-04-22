export interface ButtonProps {
	children: string
	color?: 'blue' | 'green' | 'red'
	width?: number | string
	onPress?: () => void
	onPressIn?: () => void
	onPressOut?: () => void
}
