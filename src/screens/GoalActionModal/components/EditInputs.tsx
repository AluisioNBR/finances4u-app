import { DefaultInput } from '../../../components/DefaultInput/DefaultInput'
import { EditInputsProps } from '../types/EditInputsProps.interface'

export function EditInputs(props: EditInputsProps) {
	const {
		goalName,
		setGoalName,
		goalValue,
		setGoalValue,
		increment,
		availableIncrement,
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
				helpMessage={`Taxa disponível: ${availableIncrement}%`}
			>
				{increment}
			</DefaultInput>
		</>
	)
}
