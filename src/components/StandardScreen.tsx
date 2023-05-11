import { View } from 'react-native'

interface StandardScreenProps {
	children: JSX.Element[]
	pos?: 'start' | 'between' | 'center'
}

export function StandardScreen(props: StandardScreenProps) {
	return (
		<View
			className='flex-1 items-center px-4 py-2'
			style={{
				gap: 32,
				justifyContent:
					props.pos == 'center'
						? 'center'
						: props.pos == 'between'
						? 'space-between'
						: 'flex-start',
			}}
		>
			{props.children}
		</View>
	)
}
