import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContext, useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { useState, useEffect, useContext, useCallback } from 'react'
import { View, BackHandler } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { Goal } from '../../@types/data/Goal.interface'
import { DefaultUser, User } from '../../@types/data/User.interface'
import { ActionButtonsContainer } from '../../components/ActionButtonsContainer'
import { adjustGreetingMsg } from './functions/adjustGreetingMsg'
import { BalanceInfos } from './components/BalanceInfos'
import { GoalsViewer } from './components/GoalsViewer'
import { Block } from '../../@types/data/Block.interface'
import { Transaction } from '../../@types/data/Transaction.interface'
import { HomeActionButtons } from './data/HomeActionButtons'
import { Oswald } from '../../styles/Oswald.font'

export function HomeScreen() {
	const [date, setDate] = useState(new Date())
	const [greetingMsg, setGreetingMsg] = useState('Bom dia')

	const [userData, setUserData] = useState<User>(DefaultUser)
	const [userGoalsData, setUserGoalsData] = useState<Goal[]>([])
	const [userBlocksData, setUserBlocksData] = useState<Block[]>([])
	const [userStatementData, setUserStatementData] = useState<Transaction[]>([])

	const navigator = useContext(NavigationContext)

	useEffect(() => {
		;(async () => {
			const userId = await AsyncStorage.getItem('userId')
			const user = await axios.get<User>(
				`https://finances4u-api.bohr.io/api/user/${userId}`
			)
			setUserData(user.data)

			const goals = await axios.get<Goal[]>(
				`https://finances4u-api.bohr.io/api/user/${userId}/goals/`
			)
			setUserGoalsData(goals.data)

			const blocks = await axios.get<Block[]>(
				`https://finances4u-api.bohr.io/api/user/${userId}/blocks`
			)
			setUserBlocksData(blocks.data)

			const statement = await axios.get<Transaction[]>(
				`https://finances4u-api.bohr.io/api/user/${userId}/statement`
			)
			setUserStatementData(statement.data)
		})()

		adjustGreetingMsg(date, setGreetingMsg)
	}, [date])

	const getAvailableBalance = useCallback(() => {
		let finalDecrement = 0
		userGoalsData.forEach((goal) => {
			finalDecrement = finalDecrement + goal.currentValue
		})
		userBlocksData.forEach((block) => {
			finalDecrement = finalDecrement + block.value
		})
		userStatementData.forEach((transaction) => {
			if (transaction.type == 'Expense')
				finalDecrement = finalDecrement + transaction.value
		})
		return userData.balance - finalDecrement
	}, [userData, userGoalsData, userBlocksData, userStatementData])

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				BackHandler.exitApp()
				return true
			}

			const subscription = BackHandler.addEventListener(
				'hardwareBackPress',
				onBackPress
			)

			return () => subscription.remove()
		}, [])
	)

	if (userData.username == 'User')
		return (
			<View className='flex-1 items-center justify-center'>
				<Text
					variant='headlineLarge'
					className='text-center'
					style={Oswald.regular}
				>
					Estamos carregando suas informações...
				</Text>
			</View>
		)
	else
		return (
			<View
				className='flex-1 items-center justify-start px-4 py-2'
				style={{ gap: 32 }}
			>
				<View className='w-full flex-row items-center justify-between py-3 border-b-[#00000022] border-b-[1px]'>
					<IconButton
						icon='menu'
						size={34}
						onPress={() => {
							// @ts-ignore
							const drawer = navigator.getParent('MenuDrawer')

							// @ts-ignore
							if (drawer) drawer.openDrawer()
						}}
					/>
					<Text variant='headlineLarge' className='pr-2' style={Oswald.regular}>
						{greetingMsg} {userData.username}!
					</Text>
				</View>

				<BalanceInfos
					statement={userStatementData}
					getAvailableBalance={getAvailableBalance}
				>
					{userData}
				</BalanceInfos>

				<ActionButtonsContainer title='O que deseja fazer agora ?'>
					{HomeActionButtons(
						userData._id,
						getAvailableBalance(),
						userData.incrementRateAvailable,
						navigator.navigate,
						setDate
					)}
				</ActionButtonsContainer>

				<GoalsViewer
					user={userData}
					getAvailableBalance={getAvailableBalance}
					setDate={setDate}
				>
					{userGoalsData}
				</GoalsViewer>
			</View>
		)
}
