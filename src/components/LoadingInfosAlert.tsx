import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Oswald } from '../styles/Oswald.font'

export function LoadingInfosAlert(props: { children: string }) {
	return (
		<View className='flex-1 items-center justify-center'>
			<Text
				variant='headlineLarge'
				className='text-center'
				style={Oswald.regular}
			>
				{props.children}
			</Text>
		</View>
	)
}
