import { View } from 'react-native'
import Animated, { RotateInDownRight } from 'react-native-reanimated'
import { LoadingBarProps } from '../types/LoadingBarProps.interface'
import { rotateAnim } from '../data/rotateAnim'
import { getBarColorGradient } from '../functions/getBarColorGradient'
import { LinearGradient } from 'expo-linear-gradient'

export function LoadingBar(props: LoadingBarProps) {
	return (
		<Animated.View
			entering={rotateAnim.duration(props.duration + 5000)}
			className='p-8 justify-center items-center'
		>
			<LinearGradient
				colors={getBarColorGradient(props.barColor)}
				className='w-[220] h-[220] rounded-full items-center justify-center'
			>
				<View className='w-[200] h-[200] rounded-full items-center justify-center bg-white-1' />
			</LinearGradient>
		</Animated.View>
	)
}
