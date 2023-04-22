import { useState } from 'react'
import { View } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { Oswald } from '../styles/Oswald.font'
import colors from '../../colors'

interface ActionButtonsContainerProps {
	children: ActionButtonProps[]
	title?: string
	gap?: number
}

export function ActionButtonsContainer(props: ActionButtonsContainerProps) {
	return (
		<View className='items-center w-full'>
			{props.title ? (
				<Text
					variant='headlineMedium'
					className='text-gray-3'
					style={Oswald.bold}
				>
					{props.title}
				</Text>
			) : null}

			<View
				className='flex-row flex-wrap items-center'
				style={{ gap: props.gap ? props.gap : 3 }}
			>
				{props.children.map((button) => (
					<ActionButton
						key={button.children}
						color={button.color as 'blue' | 'green' | 'red'}
						action={button.action}
						icon={button.icon}
					>
						{button.children}
					</ActionButton>
				))}
			</View>
		</View>
	)
}

export interface ActionButtonProps {
	children: string
	action: () => void
	color: 'blue' | 'green' | 'red'
	icon: string
}

function ActionButton(props: ActionButtonProps) {
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
