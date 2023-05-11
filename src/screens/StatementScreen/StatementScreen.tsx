import { View, ScrollView } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { Transaction } from '../../@types/data/Transaction.interface'
import { Text } from 'react-native-paper'
import colors from '../../../colors'
import { Oswald } from '../../styles/Oswald.font'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'

interface StatementScreenParams {
	statement: Transaction[]
	balance: number
	availableBalance: number
}

enum MonthName {
	m0 = 'Janeiro',
	m1 = 'Fervereiro',
	m2 = 'Março',
	m3 = 'Abril',
	m4 = 'Maio',
	m5 = 'Junho',
	m6 = 'Julho',
	m7 = 'Agosto',
	m8 = 'Setembro',
	m9 = 'Outubro',
	m10 = 'Novembro',
	m11 = 'Dezembro',
}

type NumberMonth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

interface MonthFormattedStatement {
	month: NumberMonth
	transactions: DayFormattedStatement[]
}

interface DayFormattedStatement {
	day: number
	transactions: Transaction[]
}

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
		statement.forEach((transaction) => {
			const month: unknown = new Date(transaction.timestamp).getMonth()
			let monthIsNotAdded = true

			if (formattedStatement.length == 0)
				setFormattedStatement((prevState) => {
					prevState.push({
						month: month as NumberMonth,
						transactions: [],
					})
					return prevState
				})
			else {
				formattedStatement.forEach((statement) => {
					if (statement.month == month) monthIsNotAdded = false
				})

				if (monthIsNotAdded)
					setFormattedStatement((prevState) => {
						prevState.push({
							month: month as NumberMonth,
							transactions: [],
						})
						return prevState
					})
			}

			for (let index = 0; index < formattedStatement.length; index++) {
				if (formattedStatement[index].month == month) {
					const day = new Date(transaction.timestamp).getDate()
					let dayIsNotAdded = true
					if (formattedStatement[index].transactions.length == 0)
						setFormattedStatement((prevState) => {
							prevState[index].transactions.push({ day: day, transactions: [] })
							return prevState
						})
					else {
						formattedStatement[index].transactions.forEach((statement) => {
							if (statement.day == day) dayIsNotAdded = false
						})

						if (dayIsNotAdded)
							setFormattedStatement((prevState) => {
								prevState[index].transactions.push({
									day: day,
									transactions: [],
								})
								return prevState
							})
					}
					for (
						let index2 = 0;
						index2 < formattedStatement[index].transactions.length;
						index2++
					)
						if (formattedStatement[index].transactions[index2].day == day)
							setFormattedStatement((prevState) => {
								prevState[index].transactions[index2].transactions.push(
									transaction
								)
								return prevState
							})
				}
			}
		})
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
							<View key={monthKey} className='w-full'>
								<Text variant='titleLarge' style={Oswald.regular}>
									{MonthName[monthKey]}
								</Text>

								<View className='w-full'>
									{monthStatement.transactions.reverse().map((dayStatement) => {
										const dayKey = `Dia ${dayStatement.day}`

										return (
											<View className='w-[97%] ml-[3%]' key={dayKey}>
												<Text className='text-lg' style={Oswald.regular}>
													{dayKey}
												</Text>

												{dayStatement.transactions.map((transaction) => {
													const valueStyle = {
														color:
															transaction.type == 'Income'
																? colors.green[1]
																: colors.red[1],
													}
													return (
														<View
															key={`${transaction.type}: ${transaction.name}`}
															className='w-[97%] ml-[3%]'
														>
															<Text
																className='text-lg'
																style={[Oswald.regular, valueStyle]}
															>
																{transaction.name}: R${transaction.value}
															</Text>
														</View>
													)
												})}
											</View>
										)
									})}
								</View>
							</View>
						)
					})}
				</ScrollView>
			</View>
		</StandardScreen>
	)
}
