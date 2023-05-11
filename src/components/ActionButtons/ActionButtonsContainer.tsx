import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Oswald } from '../../styles/Oswald.font'
import { ActionButton } from './components/ActionButton'
import { ActionButtonsContainerProps } from './types/ActionButtonContainerProps.interface'

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
