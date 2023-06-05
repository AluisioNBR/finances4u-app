import { Text } from 'react-native-paper'
import { Pressable } from 'react-native'
import { ButtonProps } from '../@types/ButtonProps.interface'
import colors from '../../colors'

import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { Oswald } from '../styles/Oswald.font'

const AnimatedButton = Animated.createAnimatedComponent(Pressable)

export function BigGreenButton(props: ButtonProps) {
	const buttonColor = useSharedValue(0)
	const pressIn = () => {
		if (callbackWasInformed(props.onPressIn)) props.onPressIn()

		buttonColor.value = withTiming(1, { duration: 150 })
	}
	const pressOut = () => {
		if (callbackWasInformed(props.onPressOut)) props.onPressOut()

		buttonColor.value = withTiming(0, { duration: 150 })
	}
	const press = callbackWasInformed(props.onPress) ? props.onPress : () => {}

	const animatedColor = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				buttonColor.value,
				[0, 1],
				[colors.green[3], colors.green[1]]
			),
		}
	})

	return (
		<AnimatedButton
			className='w-full p-1 rounded-full'
			style={animatedColor}
			onPressIn={pressIn}
			onPressOut={pressOut}
			onPress={press}
		>
			<Text
				className='text-[24px] text-white-1 text-center py-1'
				style={Oswald.medium}
			>
				{props.children}
			</Text>
		</AnimatedButton>
	)
}

function callbackWasInformed(callback: () => void) {
	return callback != undefined && callback != null
}
