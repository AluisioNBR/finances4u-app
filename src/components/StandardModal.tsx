import { View } from 'react-native'

export function StandardModal(props: { children: JSX.Element[] }) {
	return (
		<View className='flex-1 items-center justify-center bg-[#0005]'>
			<View className='gap-4 bg-white-1 p-5 w-[95%] rounded-3xl justify-between'>
				{props.children}
			</View>
		</View>
	)
}
