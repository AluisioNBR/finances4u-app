import { useState, useEffect, useContext } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { NavigationContext } from '@react-navigation/native'
import { BalanceInfosProps } from '../types/BalanceInfosProps.interface'
import { Text } from 'react-native-paper'
import colors from '../../../../colors'
import { Oswald } from '../../../styles/Oswald.font'
import { getUserBalanceDecrement } from '../../../components/getUserBalanceDecrement'

export function BalanceInfos(props: BalanceInfosProps) {
	const navigator = useContext(NavigationContext)

	const [buttonColor, setButtonColor] = useState(colors.green[1])
	const [availableBalance, setAvailabeBalance] = useState(0)

	useEffect(() => {
		;(async () => {
			setAvailabeBalance(
				props.children.balance - (await getUserBalanceDecrement())
			)
		})()
	}, [])

	return (
		<View className='items-center w-full p-4 rounded-3xl bg-green-3'>
			<Text
				variant='titleLarge'
				className='text-white-1 text-[22px]'
				style={Oswald.regular}
			>
				Disponível: R${availableBalance}
			</Text>

			<View className='w-full flex-row items-center justify-between'>
				<View>
					<Text className='text-white-1 text-[22px]' style={Oswald.regular}>
						Receitas:{' '}
						<Text className='text-green-1' style={Oswald.regular}>
							R${props.children.incomes}
						</Text>
					</Text>

					<Text className='text-white-1 text-[22px]' style={Oswald.regular}>
						Despesas:{' '}
						<Text className='text-red-1' style={Oswald.regular}>
							R${props.children.expenses}
						</Text>
					</Text>
				</View>

				<TouchableOpacity
					className='px-5 py-1 rounded-full'
					style={{ backgroundColor: buttonColor }}
					onPress={() => {
						navigator.navigate('Statement', {
							statement: props.statement,
							balance: props.children.balance,
						})
					}}
					onPressIn={() => setButtonColor(colors.green[2])}
					onPressOut={() => setButtonColor(colors.green[1])}
				>
					<Text className='text-white-1 text-[22px]' style={Oswald.regular}>
						Extrato
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
