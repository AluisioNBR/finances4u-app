import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Oswald } from '../../../styles/Oswald.font'
import { MonthContainerProps } from '../types/MonthContainerProps.interface'
import { MonthName } from '../types/MonthName.enum'
import { DayTransactionsContainer } from './DayTransactionsContainer'

export function MonthContainer(props: MonthContainerProps) {
	return (
		<View className='w-full'>
			<Text variant='titleLarge' style={Oswald.regular}>
				{MonthName[props.monthKey]}
			</Text>

			<View className='w-full'>
				{props.children.reverse().map((dayStatement) => {
					const dayKey = `Dia ${dayStatement.day}`

					return (
						<DayTransactionsContainer dayKey={dayKey}>
							{dayStatement.transactions}
						</DayTransactionsContainer>
					)
				})}
			</View>
		</View>
	)
}
