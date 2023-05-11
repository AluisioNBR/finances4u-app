import { useState, useEffect, useContext } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import { Oswald } from '../../styles/Oswald.font'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import { CustomBigButton } from '../../components/CustomBigButton'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'
import axios from 'axios'
import { Sugestion } from '../../@types/data/Sugestion.interface'
import { NavigationContext } from '@react-navigation/native'
import { userInfo } from '../../components/userInfo'

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

				{error == '' ? null : (
					<Text className='text-red-1 text-center' style={Oswald.bold}>
						{error}
					</Text>
				)}
			</View>

			<View className='w-full flex-row items-center justify-evenly'>
				<CustomBigButton color='red' width={150} onPress={cleanFields}>
					Limpar
				</CustomBigButton>

				<CustomBigButton
					color='green'
					width={150}
					onPress={async () => {
						try {
							if (title == '' || sugestion == '')
								throw new Error(
									'O título e a descrição não podem estar vazios!'
								)
							navigator.navigate('LoadingModal', {
								redirect: 'Sugestions',
								title: 'Enviando...',
							})
							await axios.post<Sugestion>(
								`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/support/send/sugestion/?title=${title}&body=${sugestion}`
							)
							cleanFields()
						} catch (e) {
							setError(e.message)
						}
					}}
				>
					Enviar
				</CustomBigButton>
			</View>
		</StandardScreen>
	)
}
