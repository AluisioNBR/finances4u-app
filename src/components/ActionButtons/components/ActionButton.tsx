import { useState } from 'react'
import { View } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { Oswald } from '../../../styles/Oswald.font'
import { buttonColors } from '../../buttonColors'
import { ActionButtonProps } from '../types/ActionButtonProps.interface'

export function ActionButton(props: ActionButtonProps) {
	const [bg, setBg] = useState(buttonColors.standart[props.color])
	return (
		<View className='items-center'>
			<IconButton
				icon={props.icon}
				iconColor={'#fff'}
				containerColor={bg}
				className='p-1 rounded-3xl'
				size={64}
				onPressIn={() => setBg(buttonColors.active[props.color])}
				onPressOut={() => setBg(buttonColors.standart[props.color])}
				onPress={props.action}
			/>

			<Text variant='labelLarge' className='text-gray-3' style={Oswald.regular}>
				{props.children}
			</Text>
		</View>
	)
}
