import { View } from 'react-native'
import Animatable from 'react-native-animatable'
import { LoadingBarProps } from '../types/LoadingBarProps.interface'
import { rotateAnim } from '../data/rotateAnim'
import { getBarColorGradient } from '../functions/getBarColorGradient'
import { LinearGradient } from 'expo-linear-gradient'

export function LoadingBar(props: LoadingBarProps) {
	return (
		<Animatable.View
			animation={rotateAnim}
			iterationCount={Infinity}
			duration={props.duration}
			className='p-8 justify-center items-center'
		>
			<LinearGradient
				colors={getBarColorGradient(props.barColor)}
				className='w-[220] h-[220] rounded-full items-center justify-center'
			>
				<View className='w-[200] h-[200] rounded-full items-center justify-center bg-white-1'></View>
			</LinearGradient>
		</Animatable.View>
	)
}
