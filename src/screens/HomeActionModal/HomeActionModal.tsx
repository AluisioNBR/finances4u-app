import { useState, useEffect } from 'react'
import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { useContext } from 'react'
import { CustomBigButton } from '../../components/CustomBigButton'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import { HomeActionModalParams } from './types/HomeActionModalParams.interface'
import { buttonConfig } from './data/buttonConfig'
import { ModalStandardButtonsContainer } from '../../components/ModalStandardButtonsContainer'
import { ErrorMsg } from '../../components/ErrorMsg'
import { StandardModal } from '../../components/StandardModal'
import { confirmAction } from './functions/confirmAction'

export function HomeActionModal() {
	const navigator = useContext(NavigationContext)
	const { params } = useContext(NavigationRouteContext)
	const { userId, label1, label2, type, setDate, availableBalance } =
		params as HomeActionModalParams

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
	}, [])

	const [input1, setInput1] = useState('')
	const [input2, setInput2] = useState('')
	const [error, setError] = useState('')

	return (
		<StandardModal>
			<DefaultInput
				required
				bold
				label={label1}
				onChange={(newText) => {
					if (newText.length <= 24) setInput1(newText)
				}}
				helpMessage='Máximo de 24 caracteres'
			>
				{input1}
			</DefaultInput>

			<DefaultInput
				required
				bold
				label={label2}
				onChange={(newText) => {
					if (availableBalance && parseFloat(newText) <= availableBalance)
						setInput2(newText)
					else setInput2(newText)
				}}
				helpMessage={
					availableBalance != undefined && availableBalance != null
						? `Disponível: R$${availableBalance}`
						: null
				}
			>
				{input2}
			</DefaultInput>

			<ErrorMsg>{error}</ErrorMsg>

			<ModalStandardButtonsContainer>
				<CustomBigButton
					width={150}
					color='red'
					onPress={() => {
						setInput1('')
						setInput2('')
						navigator.goBack()
					}}
				>
					Cancelar
				</CustomBigButton>

				<CustomBigButton
					width={150}
					color={buttonConfig[type].color as 'blue' | 'green' | 'red'}
					onPress={async () =>
						await confirmAction(
							userId,
							input1,
							input2,
							type,
							availableBalance,
							setError,
							setDate,
							navigator
						)
					}
				>
					{buttonConfig[type].text}
				</CustomBigButton>
			</ModalStandardButtonsContainer>
		</StandardModal>
	)
}
