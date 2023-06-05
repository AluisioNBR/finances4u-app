export interface DefaultInputProps {
	label?: string
	bold?: boolean
	secure?: boolean
	rows?: number
	children: string
	onChange: (newValue: string) => void
	required?: boolean
	helpMessage?: string
	rounded?: number
	multiline?: boolean
}
