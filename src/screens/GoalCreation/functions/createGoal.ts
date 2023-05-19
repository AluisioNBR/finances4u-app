import { NavigationProp, ParamListBase } from '@react-navigation/native'
import axios from 'axios'
import { Dispatch } from 'react'
import { Goal } from '../../../@types/data/Goal.interface'

export async function createGoal(
	userId: string,
	name: string,
	goalValue: string,
	currentValue: string,
	incrementRate: string,
	goalPic: string,
	uploadImage: (goalId: string) => Promise<void>,
	setError: Dispatch<string>,
	setDate: Dispatch<Date>,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	try {
		let goalValueNumber = parseFloat(goalValue),
			currentValueNumber = parseFloat(currentValue),
			incrementRateNumber = incrementRate == '' ? 0 : parseInt(incrementRate)

		if (isNaN(goalValueNumber) || isNaN(currentValueNumber) || name == '')
			throw new Error(
				'Dados Incorretos! Por favor informe um nome, e nos valores numéricos digite apenas números. Para a taxa de incremento apenas números inteiros são aceitos. Caso a imagem fornecida tenha mais de 10mb ela não será aceita pelo sistema!'
			)

		const { data } = await axios.post<Goal>(
			`https://finances4u-api.bohr.io/api/user/${userId}/goals/create?name=${name}&goalValue=${goalValue}&currentValue=${currentValue}&incrementRate=${incrementRateNumber}`
		)

		if (data) {
			if (goalPic) await uploadImage(data._id)
			setDate(new Date())
			navigator.navigate('LoadingModal', {
				redirect: 'Home',
				title: 'Criando...',
			})
		}
	} catch (error) {
		setError(error.message)
	}
}
