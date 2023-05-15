import { useState } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Divider } from 'react-native-paper'
import Animated, { SlideInUp, SlideOutDown } from 'react-native-reanimated'
import { Oswald } from '../../../styles/Oswald.font'
import { AnsweredQuestionProps } from '../types/AnsweredQuestionProps.interface'

export function AnsweredQuestion(props: AnsweredQuestionProps) {
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
