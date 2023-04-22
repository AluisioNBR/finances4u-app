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

export function CustomBigButton(props: ButtonProps) {
	const buttonColors = {
		standart: {
			blue: colors.blue[2],
			green: colors.green[3],
			red: colors.red[3],
		},

		active: {
			blue: colors.blue[1],
			green: colors.green[2],
			red: colors.red[2],
		},
	}

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
				[buttonColors.standart[props.color], buttonColors.active[props.color]]
			),
		}
	})

	return (
		<AnimatedButton
			onPressIn={pressIn}
			onPressOut={pressOut}
			onPress={press}
			className='p-1 rounded-full'
			style={[animatedColor, props.width ? { width: props.width } : {}]}
		>
			<Text
				className='text-[22px] text-center text-white-1'
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
