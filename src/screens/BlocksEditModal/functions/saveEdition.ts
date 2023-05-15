import axios from 'axios'
import { Dispatch } from 'react'
import { Block } from '../../../@types/data/Block.interface'

export async function saveEdition(
	owner: string,
	id: string,
	name: string,
	value: string,
	setDate: Dispatch<Date>,
	setError: Dispatch<string>
) {
	try {
		if (isNaN(Number(value)))
			throw new Error('Certifique-se de digitar apenas números, por favor!')
		const { data } = await axios.patch<Block>(
			`https://finances4u-api.bohr.io/api/user/${owner}/blocks/${id}/edit/?name=${name}&value=${value}`
		)
		if (data._id == id) setDate(new Date())
	} catch (error) {
		setError(error.message)
	}
}
