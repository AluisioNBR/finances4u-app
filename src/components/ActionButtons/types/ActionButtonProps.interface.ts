export interface ActionButtonProps {
	children: string
	action: () => void
	color: 'blue' | 'green' | 'red'
	icon: string
}
