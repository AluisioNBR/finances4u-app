import { NavigationProp, ParamListBase } from '@react-navigation/native'
import axios from 'axios'
import { Dispatch } from 'react'
import { userInfo } from '../../../components/userInfo'
import { Transaction } from '../../../@types/data/Transaction.interface'

export async function confirmAction(
	userId: string,
	input1: string,
	input2: string,
	type: 'receive' | 'pay' | 'block',
	availableBalance: number,
	setError: Dispatch<string>,
	setDate: Dispatch<Date>,
	navigator: NavigationProp<ParamListBase, string, undefined>
) {
	try {
		const value = parseFloat(input2)
		if (isNaN(value) || (type != 'receive' && value > availableBalance))
			throw new Error()

		const endpoint =
			type == 'block'
				? `blocks/create`
				: `statement/register/${type == 'receive' ? 'receipt' : 'payment'}`

		const { data } = await axios.post(
			`https://finances4u-api.bohr.io/api/user/${userId}/${endpoint}?name=${input1}&value=${value}`
		)

		if (data) {
			setDate(new Date())
			setError('')

			if (type != 'block') {
				const dataToUse = data as Transaction
				userInfo.balance =
					type == 'receive' ? +dataToUse.value : -dataToUse.value
			}

			navigator.navigate('LoadingModal', {
				redirect: 'Home',
				title:
					type == 'block'
						? 'Criando'
						: type == 'receive'
						? 'Adicionando'
						: 'Pagando',
				barColor: type == 'block' || type == 'receive' ? 'green' : 'red',
			})
		}
	} catch (error) {
		setError(
			'Certifique-se de ter nomeado, e que o valor que foi digitado foram apenas números e de que tem saldo suficiente disponível!'
		)
	}
}
