import { NavigationContext, useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { useState, useEffect, useContext, useCallback } from 'react'
import { BackHandler } from 'react-native'
import { Goal } from '../../@types/data/Goal.interface'
import { DefaultUser, User } from '../../@types/data/User.interface'
import { ActionButtonsContainer } from '../../components/ActionButtonsContainer'
import { adjustGreetingMsg } from './functions/adjustGreetingMsg'
import { BalanceInfos } from './components/BalanceInfos'
import { GoalsViewer } from './components/GoalsViewer'
import { Block } from '../../@types/data/Block.interface'
import { Transaction } from '../../@types/data/Transaction.interface'
import { HomeActionButtons } from './data/HomeActionButtons'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader'
import { LoadingInfosAlert } from '../../components/LoadingInfosAlert'
import { userInfo } from '../../components/userInfo'

export function HomeScreen() {
	const [date, setDate] = useState(new Date())
	const [greetingMsg, setGreetingMsg] = useState('Bom dia')

	const [userData, setUserData] = useState<User>(DefaultUser)
	const [userGoalsData, setUserGoalsData] = useState<Goal[]>([])
	const [userStatementData, setUserStatementData] = useState<Transaction[]>([])

	const navigator = useContext(NavigationContext)

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: true })
	}, [])

	useEffect(() => {
		;(async () => {
			const user = await axios.get<User>(
				`https://finances4u-api.bohr.io/api/user/${userInfo.userId}`
			)
			setUserData(user.data)

			const goals = await axios.get<Goal[]>(
				`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/goals/`
			)
			setUserGoalsData(goals.data)

			const statement = await axios.get<Transaction[]>(
				`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/statement`
			)
			setUserStatementData(statement.data)
		})()

		adjustGreetingMsg(date, setGreetingMsg)
	}, [date])

	const getAvailableBalance = useCallback(() => {
		let finalDecrement = 0
		;(async () => {
			const goals = await axios.get<Goal[]>(
				`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/goals/`
			)
			goals.data.forEach((goal) => {
				finalDecrement = finalDecrement + goal.currentValue
			})

			const blocks = await axios.get<Block[]>(
				`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/blocks`
			)
			blocks.data.forEach((block) => {
				finalDecrement = finalDecrement + block.value
			})

			const statement = await axios.get<Transaction[]>(
				`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/statement`
			)
			statement.data.forEach((transaction) => {
				if (transaction.type == 'Expense')
					finalDecrement = finalDecrement + transaction.value
			})
		})()
		return userData.balance - finalDecrement
	}, [userData])

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
			<LoadingInfosAlert>
				Estamos carregando suas informações...
			</LoadingInfosAlert>
		)
	else
		return (
			<StandardScreen>
				<StandardHeader titleEnd>
					{`${greetingMsg} ${userData.username}!`}
				</StandardHeader>

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
					setDate={setDate}
					user={userData}
					getAvailableBalance={getAvailableBalance}
				>
					{userGoalsData}
				</GoalsViewer>
			</StandardScreen>
		)
}
