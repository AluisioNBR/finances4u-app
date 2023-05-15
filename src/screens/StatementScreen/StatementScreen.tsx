import { View, ScrollView } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { Text } from 'react-native-paper'
import { Oswald } from '../../styles/Oswald.font'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'
import { StatementScreenParams } from './types/StatementScreenParams.interface'
import { MonthFormattedStatement } from './types/MonthFormattedStatement.interface'
import { formatTransaction } from './functions/formatTransaction'
import { MonthContainer } from './components/MonthContainer'

export function StatementScreen() {
	const navigator = useContext(NavigationContext)
	const route = useContext(NavigationRouteContext)
	const { statement, balance, availableBalance } =
		route.params as StatementScreenParams

	const [formattedStatement, setFormattedStatement] = useState<
		MonthFormattedStatement[]
	>([])
	const [statementToUse, setStatementToUse] = useState<
		MonthFormattedStatement[]
	>([])

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
	}, [])

	useEffect(() => {
		statement.forEach((transaction) =>
			formatTransaction(transaction, formattedStatement, setFormattedStatement)
		)
	}, [statement])

	useEffect(() => {
		setStatementToUse(formattedStatement)
	}, [formattedStatement])

	return (
		<StandardScreen>
			<StandardHeader noMenu buttonPos={-158}>
				Extrato
			</StandardHeader>

			<View className='flex-1 w-full items-center gap-6'>
				<View className='w-full items-start'>
					<Text variant='headlineSmall' style={Oswald.regular}>
						Saldo Total: R${balance}
					</Text>

					<Text variant='titleLarge' style={Oswald.regular}>
						Saldo Disponível: R${availableBalance}
					</Text>
				</View>

				<Text
					variant='headlineLarge'
					className='text-left w-full'
					style={Oswald.bold}
				>
					Histórico
				</Text>

				<ScrollView className='w-full'>
					{statementToUse.reverse().map((monthStatement) => {
						const monthKey = `m${monthStatement.month}`
						return (
							<MonthContainer monthKey={monthKey}>
								{monthStatement.transactions}
							</MonthContainer>
						)
					})}
				</ScrollView>
			</View>
		</StandardScreen>
	)
}
