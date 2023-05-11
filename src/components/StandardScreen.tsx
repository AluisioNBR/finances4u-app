import { View } from 'react-native'

export function StandardScreen(props: {
	children: JSX.Element[]
	pos?: 'start' | 'between' | 'center'
}) {
	const justify =
		props.pos == 'center'
			? 'center'
			: props.pos == 'between'
			? 'space-between'
			: 'flex-start'

	return (
		<View
			className='flex-1 items-center px-4 py-2'
			style={{
				gap: 32,
				justifyContent: justify,
			}}
		>
			{props.children}
		</View>
	)
}
