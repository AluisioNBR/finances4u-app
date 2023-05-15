import { Dispatch } from 'react'
import { DefaultInput } from '../../../components/DefaultInput/DefaultInput'

interface EditInputsProps {
	goalName: string
	setGoalName: Dispatch<string>
	goalValue: string
	setGoalValue: Dispatch<string>
	increment: string
	setIncrement: Dispatch<string>
}

export function EditInputs(props: EditInputsProps) {
	const {
		goalName,
		setGoalName,
		goalValue,
		setGoalValue,
		increment,
		setIncrement,
	} = props

	return (
		<>
			<DefaultInput
				required
				bold
				label='Qual será o novo nome ?'
				onChange={(newText) => {
					if (newText.length <= 24) setGoalName(newText)
				}}
				helpMessage='Máximo de 24 caracteres'
			>
				{goalName}
			</DefaultInput>

			<DefaultInput
				required
				bold
				label='Qual é a nova meta ?'
				onChange={(newText) => setGoalValue(newText)}
			>
				{goalValue}
			</DefaultInput>

			<DefaultInput
				required
				bold
				label='Qual a taxa de incremento ?'
				onChange={(newText) => setIncrement(newText)}
			>
				{increment}
			</DefaultInput>
		</>
	)
}
