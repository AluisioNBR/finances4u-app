import { NavigationContext } from '@react-navigation/native'
import { useState, useContext } from 'react'
import { TouchableWithoutFeedback, View, Image } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import colors from '../../../../colors'
import { Oswald } from '../../../styles/Oswald.font'
import { GoalButtonProps } from '../types/GoalButtonProps.interface'

export function GoalButton(props: GoalButtonProps) {
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
					balance: props.balance,
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
