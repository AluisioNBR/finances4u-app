import { NavigationContext } from '@react-navigation/native'
import { useContext } from 'react'
import { View } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { Oswald } from '../../../styles/Oswald.font'
import { StandardHeaderProps } from '../types/StandardHeaderProps.interface'

export function HeaderWithReturn(props: StandardHeaderProps) {
	const navigator = useContext(NavigationContext)
	const isBold = props.bold ? true : false

	return (
		<View className='flex-row items-center py-3'>
			<IconButton
				icon='keyboard-return'
				className='absolute bg-gray-1 w-11 h-11'
				style={{ left: props.buttonPos ? props.buttonPos : -160 }}
				onPress={() => {
					const callbackExec = props.callback ? props.callback : () => {}
					callbackExec()
					navigator.goBack()
				}}
			/>

			<Text
				variant='headlineLarge'
				style={isBold ? Oswald.bold : Oswald.regular}
			>
				{props.children}
			</Text>
		</View>
	)
}
