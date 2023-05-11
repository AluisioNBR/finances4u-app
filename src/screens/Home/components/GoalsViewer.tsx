import { useState, useContext, Dispatch } from 'react'
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import colors from '../../../../colors'
import { Goal } from '../../../@types/data/Goal.interface'
import { Image } from 'react-native'
import { NavigationContext } from '@react-navigation/native'
import { User } from '../../../@types/data/User.interface'
import { Oswald } from '../../../styles/Oswald.font'

interface GoalsViewerProps {
	children: Goal[]
	user: User
	getAvailableBalance: () => number
	setDate: Dispatch<Date>
}

export function GoalsViewer(props: GoalsViewerProps) {
	const listGoals = props.children.map((goal) => (
		<GoalButton
			setDate={props.setDate}
			key={goal.name}
			getAvailableBalance={props.getAvailableBalance}
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

interface GoalButtonProps {
	children: Goal
	incrementRateAvailable: number
	getAvailableBalance: () => number
	setDate: Dispatch<Date>
}

function GoalButton(props: GoalButtonProps) {
	const [buttonColor, setButtonColor] = useState(
		props.children.currentValue >= props.children.goalValue
			? colors.green[1]
			: colors.green[3]
	)
	const navigator = useContext(NavigationContext)
	return (
		<TouchableWithoutFeedback
			onPress={() =>
				navigator.navigate('GoalDetails', {
					userId: props.children.owner,
					goalId: props.children._id,
					icrementRateAvailable: props.incrementRateAvailable,
					getAvailableBalance: props.getAvailableBalance,
					setDateHome: props.setDate,
				})
			}
			onPressIn={() => setButtonColor(colors.green[4])}
			onPressOut={() =>
				setButtonColor(
					props.children.currentValue >= props.children.goalValue
						? colors.green[1]
						: colors.green[3]
				)
			}
		>
			<View
				className='w-[380px] flex-row p-2 my-2'
				style={{ backgroundColor: buttonColor }}
			>
				{props.children.goalPic == '' ? (
					<IconButton
						icon='bullseye-arrow'
						iconColor={'#fff'}
						containerColor={colors.green[2]}
						className='w-[105px] h-[105px] rounded'
						size={90}
					/>
				) : (
					<View className='w-[115px] h-[115px] p-1'>
						<Image
							source={{
								uri: `data:image/png;base64,${props.children.goalPic}`,
							}}
							className='w-full h-full rounded'
						/>
					</View>
				)}
				<View className='justify-between ml-2'>
					<Text
						variant='titleLarge'
						className='text-white-1'
						style={Oswald.regular}
					>
						{props.children.name}
					</Text>

					<Text
						variant='titleMedium'
						className='text-white-1'
						style={Oswald.regular}
					>
						Meta: R${props.children.goalValue}
					</Text>

					<Text
						variant='titleMedium'
						className='text-white-1'
						style={Oswald.regular}
					>
						Investido: R${props.children.currentValue}
					</Text>

					<Text
						variant='titleMedium'
						className='text-white-1'
						style={Oswald.regular}
					>
						Incremento: {props.children.incrementRate}%
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}
