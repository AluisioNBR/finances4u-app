import { useEffect, useState, useCallback, useContext } from 'react'
import { ScrollView } from 'react-native'
import { Block } from '../../@types/data/Block.interface'
import axios from 'axios'
import { User } from '../../@types/data/User.interface'
import { Transaction } from '../../@types/data/Transaction.interface'
import { Goal } from '../../@types/data/Goal.interface'
import { NavigationContext } from '@react-navigation/native'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader/StandardHeader'
import { userInfo } from '../../components/userInfo'
import { BlockComponent } from './components/BlockComponent'

export function BlocksScreen() {
	const navigator = useContext(NavigationContext)
	const [date, setDate] = useState(new Date())
	const [user, setUser] = useState<User>()
	const [goals, setGoals] = useState<Goal[]>([])
	const [statement, setStatement] = useState<Transaction[]>([])
	const [blocks, setBlocks] = useState<Block[]>([])

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: true })
	}, [])

	useEffect(() => {
		;(async () => {
			const blocksData = await axios.get<Block[]>(
				`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/blocks`
			)
			setBlocks(blocksData.data)

			const userData = await axios.get<User>(
				`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/`
			)
			setUser(userData.data)

			const goalsData = await axios.get<Goal[]>(
				`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/goals/`
			)
			setGoals(goalsData.data)

			const statementData = await axios.get<Transaction[]>(
				`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/statement`
			)
			setStatement(statementData.data)
		})()
	}, [date])

	const getAvailableBalance = useCallback(() => {
		let finalDecrement = 0
		goals.forEach((goal) => {
			finalDecrement = finalDecrement + goal.currentValue
		})
		blocks.forEach((block) => {
			finalDecrement = finalDecrement + block.value
		})
		statement.forEach((transaction) => {
			if (transaction.type == 'Expense')
				finalDecrement = finalDecrement + transaction.value
		})
		return user.balance - finalDecrement
	}, [user, goals, blocks, statement])

	return (
		<StandardScreen pos='start'>
			<StandardHeader>Bloqueios</StandardHeader>

			<ScrollView className='w-full'>
				{blocks.map((block) => (
					<BlockComponent
						key={block._id}
						id={block._id}
						owner={block.owner}
						value={block.value}
						canEdit={user ? user.accountConfig.blocksEdit : false}
						setDate={setDate}
						getAvailableBalance={getAvailableBalance}
					>
						{block.name}
					</BlockComponent>
				))}
			</ScrollView>
		</StandardScreen>
	)
}
