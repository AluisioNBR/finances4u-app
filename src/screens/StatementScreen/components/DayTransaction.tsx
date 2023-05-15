import { View } from 'react-native'
import { Text } from 'react-native-paper'
import colors from '../../../../colors'
import { Transaction } from '../../../@types/data/Transaction.interface'
import { Oswald } from '../../../styles/Oswald.font'

export function DayTransaction(props: { children: Transaction }) {
	const valueStyle = {
		color: props.children.type == 'Income' ? colors.green[1] : colors.red[1],
	}
	return (
		<View className='w-[97%] ml-[3%]'>
			<Text className='text-lg' style={[Oswald.regular, valueStyle]}>
				{props.children.name}: R${props.children.value}
			</Text>
		</View>
	)
}
