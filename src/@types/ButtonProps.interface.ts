export interface ButtonProps {
	children: string | JSX.Element
	color?: 'blue' | 'green' | 'red'
	width?: number | string
	onPress?: () => void
	onPressIn?: () => void
	onPressOut?: () => void
}
