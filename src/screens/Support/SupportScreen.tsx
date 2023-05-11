import React, { useEffect, useState, useContext } from 'react'
import {
	ScrollView,
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native'
import { Divider, IconButton, Text } from 'react-native-paper'
import Animated, { SlideInUp, SlideOutDown } from 'react-native-reanimated'
import { Oswald } from '../../styles/Oswald.font'
import { DefaultInput } from '../../components/DefaultInput'
import { CustomBigButton } from '../../components/CustomBigButton'
import { Doubt } from '../../@types/data/Doubt.interface'
import axios from 'axios'
import { NavigationContext } from '@react-navigation/native'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader'
import { userInfo } from '../../components/userInfo'

export function SupportScreen() {
	const navigator = useContext(NavigationContext)
	const [customDoubt, setCustomDoubt] = useState('')
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
						height={200}
						rounded={24}
						multiline
						onChange={(newValue) => setCustomDoubt(newValue)}
					>
						{customDoubt}
					</DefaultInput>

					<View className='w-full flex-row items-center justify-evenly'>
						<CustomBigButton
							color='red'
							width={150}
							onPress={() => setCustomDoubt('')}
						>
							Limpar
						</CustomBigButton>

						<CustomBigButton
							color='green'
							width={150}
							onPress={async () => {
								try {
									if (customDoubt == '')
										throw new Error('Não é possível enviar uma dúvida vazia!')
									navigator.navigate('LoadingModal', {
										redirect: 'Support',
										title: 'Enviando...',
									})
									await axios.post<Doubt>(
										`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/support/send/doubt?doubt=${customDoubt}`
									)
									setCustomDoubt('')
								} catch (error) {}
							}}
						>
							Enviar
						</CustomBigButton>
					</View>
				</View>
			</KeyboardAvoidingView>
		</StandardScreen>
	)
}

interface AnsweredQuestionProps {
	children: string
	title: string
}

function AnsweredQuestion(props: AnsweredQuestionProps) {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<TouchableWithoutFeedback
			onPress={() => setIsOpen((prevState) => !prevState)}
		>
			<View className='bg-blue-3 p-3'>
				<Animated.Text
					className='text-white-1 text-[18px]'
					style={[Oswald.regular, isOpen ? { paddingBottom: 12 } : {}]}
				>
					{props.title}
				</Animated.Text>

				{isOpen ? (
					<Animated.View entering={SlideInUp} exiting={SlideOutDown}>
						<Divider />

						<View className='pt-3'>
							<Text className='text-white-1 text-[18px]' style={Oswald.regular}>
								{props.children}
							</Text>
						</View>
					</Animated.View>
				) : null}
			</View>
		</TouchableWithoutFeedback>
	)
}
