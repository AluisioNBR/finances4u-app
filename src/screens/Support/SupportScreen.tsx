import React, { useEffect, useState, useContext } from 'react'
import { ScrollView, View, KeyboardAvoidingView } from 'react-native'
import { Text } from 'react-native-paper'
import { Oswald } from '../../styles/Oswald.font'
import { DefaultInput } from '../../components/DefaultInput/DefaultInput'
import { CustomBigButton } from '../../components/CustomBigButton'
import { Doubt } from '../../@types/data/Doubt.interface'
import axios from 'axios'
import { NavigationContext } from '@react-navigation/native'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'
import { ErrorMsg } from '../../components/ErrorMsg'
import { sendDoubt } from './functions/sendDoubt'
import { AnsweredQuestion } from './components/AnsweredQuestion'

export function SupportScreen() {
	const navigator = useContext(NavigationContext)
	const [customDoubt, setCustomDoubt] = useState('')
	const [error, setError] = useState('')
	const [doubts, setDoubts] = useState<Doubt[]>([])

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: true })
		;(async () => {
			const { data } = await axios.get<Doubt[]>(
				`https://finances4u-api.bohr.io/api/admin/support/Doubt/read/ad4/`
			)
			setDoubts(data)
		})()
	}, [])

	return (
		<StandardScreen>
			<StandardHeader>Suporte</StandardHeader>

			<KeyboardAvoidingView behavior='position' className='w-[92%]'>
				<View className='w-full h-[325px]'>
					<ScrollView className='w-full h-full'>
						{doubts.map((doubt) => (
							<View className='mb-2' key={doubt._id}>
								<AnsweredQuestion title={doubt.doubt}>
									{doubt.response}
								</AnsweredQuestion>
							</View>
						))}
					</ScrollView>
				</View>

				<View className='w-full justify-start' style={{ gap: 16 }}>
					<Text className='w-full text-[18px]' style={Oswald.regular}>
						Sua dúvida não aparece acima ? Fale diretamente conosco:
					</Text>

					<DefaultInput
						label='Dúvida'
						bold
						rows={8}
						rounded={24}
						multiline
						onChange={(newValue) => setCustomDoubt(newValue)}
					>
						{customDoubt}
					</DefaultInput>

					<ErrorMsg>{error}</ErrorMsg>

					<View className='w-full flex-row items-center justify-evenly'>
						<CustomBigButton
							color='red'
							width={150}
							onPress={() => {
								setCustomDoubt('')
								setError('')
							}}
						>
							Limpar
						</CustomBigButton>

						<CustomBigButton
							color='green'
							width={150}
							onPress={async () =>
								await sendDoubt(
									customDoubt,
									setCustomDoubt,
									setError,
									navigator
								)
							}
						>
							Enviar
						</CustomBigButton>
					</View>
				</View>
			</KeyboardAvoidingView>
		</StandardScreen>
	)
}
