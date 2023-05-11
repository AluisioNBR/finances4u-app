export interface DefaultInputProps {
	label?: string
	bold?: boolean
	children: string
	onChange: (newValue: string) => void
	required?: boolean
	helpMessage?: string
	height?: string | number
	rounded?: number
	multiline?: boolean
}
