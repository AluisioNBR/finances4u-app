import { View, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { GoalsViewerProps } from '../types/GoalsViewerProps.interface'
import { Oswald } from '../../../styles/Oswald.font'
import { GoalButton } from './GoalButton'

export function GoalsViewer(props: GoalsViewerProps) {
	const listGoals = props.children.map((goal) => (
		<GoalButton
			setDate={props.setDate}
			key={goal.name}
			balance={props.user.balance}
			incrementRateAvailable={props.user.incrementRateAvailable}
		>
			{goal}
		</GoalButton>
	))

	return (
		<View className='w-full'>
			<Text
				variant='headlineMedium'
				className='text-gray-3'
				style={Oswald.medium}
			>
				Suas Metas
			</Text>

			{props.children.length == 0 ? null : (
				<ScrollView className='w-full flex-row my-2'>{listGoals}</ScrollView>
			)}
		</View>
	)
}
