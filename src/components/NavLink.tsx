import { Button, Text } from 'react-native-paper'
import { useState } from 'react'
import { ButtonProps } from '../@types/ButtonProps.interface'
import colors from '../../colors'

export function NavLink(props: ButtonProps) {
	const [color, setColor] = useState(colors.green[3])
	const pressIn = () => {
		if (callbackWasInformed(props.onPressIn)) props.onPressIn()

		setColor(colors.green[1])
	}
	const pressOut = () => {
		if (callbackWasInformed(props.onPressOut)) props.onPressOut()

		setColor(colors.green[3])
	}
	const press = callbackWasInformed(props.onPress) ? props.onPress : () => {}

	return (
		<Button
			mode='text'
			textColor={color}
			onPress={press}
			onPressIn={pressIn}
			onPressOut={pressOut}
		>
			<Text variant='bodyLarge'>{props.children}</Text>
		</Button>
	)
}

function callbackWasInformed(callback: () => void) {
	return callback != undefined && callback != null
}
