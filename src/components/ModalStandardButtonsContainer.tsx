import { View } from 'react-native'

export function ModalStandardButtonsContainer(props: {
	children: JSX.Element[]
}) {
	return (
		<View className='mt-3 flex-row justify-evenly w-full'>
			{props.children}
		</View>
	)
}
