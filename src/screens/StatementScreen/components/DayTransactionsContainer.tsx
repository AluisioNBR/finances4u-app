import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Oswald } from '../../../styles/Oswald.font'
import { DayTransactionsContainerProps } from '../types/DayTransactionsContainerProps.interface'
import { DayTransaction } from './DayTransaction'

export function DayTransactionsContainer(props: DayTransactionsContainerProps) {
	return (
		<View className='w-[97%] ml-[3%]'>
			<Text className='text-lg' style={Oswald.regular}>
				{props.dayKey}
			</Text>

			{props.children.map((transaction) => (
				<DayTransaction key={`${transaction.type}: ${transaction.name}`}>
					{transaction}
				</DayTransaction>
			))}
		</View>
	)
}
