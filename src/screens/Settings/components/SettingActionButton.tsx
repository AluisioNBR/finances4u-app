import { NavigationContext } from '@react-navigation/native'
import { useContext } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Text } from 'react-native-paper'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	interpolateColor,
	withTiming,
} from 'react-native-reanimated'
import { Oswald } from '../../../styles/Oswald.font'
import { DateContext } from '../data/DateContext'
import { buttonColors } from '../data/buttonColors'
import { SettingActionButtonProps } from '../types/SettingActionButtonProps.interface'

export function SettingActionButton(props: SettingActionButtonProps) {
	const navigator = useContext(NavigationContext)
	const { setDate } = useContext(DateContext)

	const pressed = useSharedValue(0)
	const buttonTypeColor = props.color ? props.color : 'green'

	const backgroundAnimation = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				pressed.value,
				[0, 1],
				[
					buttonColors[buttonTypeColor].background,
					buttonColors[buttonTypeColor].pressed,
				]
			),
		}
	})
	return (
		<TouchableWithoutFeedback
			onPressIn={() => (pressed.value = withTiming(1, { duration: 150 }))}
			onPress={() =>
				navigator.navigate('SettingsModal', {
					userId: props.userId,
					action: props.action,
					userPassword: props.password,
					setDate: setDate,
				})
			}
			onPressOut={() => (pressed.value = withTiming(0, { duration: 150 }))}
		>
			<Animated.View
				className='mx-4 my-2 p-4 h-24 justify-center'
				style={backgroundAnimation}
			>
				<Text
					variant='titleLarge'
					style={[
						Oswald.regular,
						{ color: buttonColors[buttonTypeColor].text },
					]}
				>
					{props.title}
				</Text>

				<Text
					variant='titleSmall'
					style={[
						Oswald.regular,
						{ color: buttonColors[buttonTypeColor].text },
					]}
				>
					{props.children}
				</Text>
			</Animated.View>
		</TouchableWithoutFeedback>
	)
}
