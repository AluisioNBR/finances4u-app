import { Oswald } from '../styles/Oswald.font'
import { Text } from 'react-native-paper'

export function ErrorMsg(props: { children: string }) {
	return (
		<>
			{props.children == '' ? null : (
				<Text className='text-center text-red-1' style={Oswald.bold}>
					{props.children}
				</Text>
			)}
		</>
	)
}
