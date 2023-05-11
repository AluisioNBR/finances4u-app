import { Button } from 'react-native-paper'
import colors from '../../../colors'
import { Oswald } from '../../styles/Oswald.font'
import { LittleBlueButtonProps } from './types/LittleBlueButtonProps.interface'

export function LittleBlueButton(props: LittleBlueButtonProps) {
	return (
		<Button
			labelStyle={[{ color: colors.white[1], fontSize: 16 }, Oswald.regular]}
			className='bg-blue-3 my-2 h-10'
			style={props.width ? { width: props.width } : {}}
			onPress={props.onPress}
		>
			{props.children}
		</Button>
	)
}
