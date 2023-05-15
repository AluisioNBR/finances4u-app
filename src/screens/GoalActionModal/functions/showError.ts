import { Dispatch } from 'react'

export function showError(
	type: 'edit' | 'increment' | 'decrement',
	setError: Dispatch<string>
) {
	if (type == 'edit')
		setError(
			'Certifique-se de ter nomeado, e que os valores que foram digitados foram apenas números!'
		)
	else
		setError(
			'Certifique-se de que o valor digitado é um número e de que é possível usá-lo!'
		)
}
