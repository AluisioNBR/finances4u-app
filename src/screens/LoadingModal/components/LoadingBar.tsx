import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { LoadingBarProps } from '../types/LoadingBarProps.interface'
import { loadingAnim } from '../data/loadingAnim'
import { getBarColor } from '../functions/getBarColorGradient'

export function ProgressBar(props: LoadingBarProps) {
	return (
		<View className='w-64 h-2 bg-gray-300 border-gray-300 border-2 justify-start overflow-hidden rounded-full'>
			<Animated.View
				entering={loadingAnim.duration(props.duration)}
				className='p-8 justify-center items-center'
				style={{ backgroundColor: getBarColor(props.barColor) }}
			></Animated.View>
		</View>
	)
}
