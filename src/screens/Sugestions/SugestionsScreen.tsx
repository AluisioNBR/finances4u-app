import { useState, useEffect, useContext } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import { Oswald } from '../../styles/Oswald.font'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import { CustomBigButton } from '../../components/CustomBigButton'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'
import { NavigationContext } from '@react-navigation/native'
import { ErrorMsg } from '../../components/ErrorMsg'
import { sendSugestion } from './functions/sendSugestion'

export function SugestionsScreen() {
	const navigator = useContext(NavigationContext)
	const [title, setTitle] = useState('')
	const [sugestion, setSugestion] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: true })
	}, [])

	const cleanFields = () => {
		setTitle('')
		setSugestion('')
		setError('')
	}

	return (
		<StandardScreen>
			<StatusBar
				hideTransitionAnimation='slide'
				hidden={true}
				animated={true}
				style='auto'
			/>
			<StandardHeader>Sugestões</StandardHeader>

			<Text variant='titleMedium' className='w-full' style={Oswald.medium}>
				Encontrou algum problema ? Gostaria de sugerir melhorias ? Por favor
				descreva aqui:
			</Text>

			<View className='w-full' style={{ gap: 12 }}>
				<DefaultInput
					label='Título'
					bold
					required
					onChange={(newValue) => setTitle(newValue)}
				>
					{title}
				</DefaultInput>

				<DefaultInput
					label='Descrição'
					multiline
					bold
					required
					height={200}
					rounded={24}
					onChange={(newValue) => setSugestion(newValue)}
				>
					{sugestion}
				</DefaultInput>

				<ErrorMsg>{error}</ErrorMsg>
			</View>

			<View className='w-full flex-row items-center justify-evenly'>
				<CustomBigButton color='red' width={150} onPress={cleanFields}>
					Limpar
				</CustomBigButton>

				<CustomBigButton
					color='green'
					width={150}
					onPress={async () =>
						await sendSugestion(
							title,
							sugestion,
							cleanFields,
							setError,
							navigator
						)
					}
				>
					Enviar
				</CustomBigButton>
			</View>
		</StandardScreen>
	)
}
