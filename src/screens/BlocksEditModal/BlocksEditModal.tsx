import { useState, useEffect } from 'react'
import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { useContext } from 'react'
import { CustomBigButton } from '../../components/CustomBigButton'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import { GoalActionModalParams } from './types/GoalActionModalParams.interface'
import { StandardModal } from '../../components/StandardModal'
import { ModalStandardButtonsContainer } from '../../components/ModalStandardButtonsContainer'
import { ErrorMsg } from '../../components/ErrorMsg'
import { saveEdition } from './functions/saveEdition'

export function BlocksEditModal() {
	const navigator = useContext(NavigationContext)
	const { params } = useContext(NavigationRouteContext)
	const { userId, blockId, blockName, blockValue, setDate, availableBalance } =
		params as GoalActionModalParams

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
	}, [])

	const [name, setName] = useState(blockName)
	const [value, setValue] = useState(`${blockValue}`)
	const [error, setError] = useState('')

	const cancelEdit = () => {
		setName('')
		setValue('')
		setError('')
		navigator.goBack()
	}

	const saveBlock = async () => {
		saveEdition(userId, blockId, name, value, setDate, setError)
		navigator.navigate('LoadingModal', {
			redirect: 'Blocks',
			title: 'Salvando...',
		})
	}

	return (
		<StandardModal>
			<DefaultInput
				required
				bold
				label='Nome do bloqueio'
				onChange={(newText) => {
					if (newText.length <= 24) setName(newText)
				}}
				helpMessage='Máximo de 24 caracteres'
			>
				{name}
			</DefaultInput>

			<DefaultInput
				required
				bold
				label='Valor do Bloqueio'
				helpMessage={`Disponível: R$${availableBalance}`}
				onChange={(newValue) =>
					setValue((prevState) => {
						if (Number(newValue) > availableBalance) return prevState
						else return newValue
					})
				}
			>
				{value}
			</DefaultInput>

			<ErrorMsg>{error}</ErrorMsg>

			<ModalStandardButtonsContainer>
				<CustomBigButton width={150} color='red' onPress={cancelEdit}>
					Cancelar
				</CustomBigButton>

				<CustomBigButton width={150} color='green' onPress={saveBlock}>
					Salvar
				</CustomBigButton>
			</ModalStandardButtonsContainer>
		</StandardModal>
	)
}
