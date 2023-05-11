import { useEffect, useState, Dispatch, useCallback, useContext } from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { Oswald } from '../../styles/Oswald.font'
import { Block } from '../../@types/data/Block.interface'
import axios from 'axios'
import { LittleBlueButton } from '../../components/LittleBlueButton'
import { User } from '../../@types/data/User.interface'
import { Transaction } from '../../@types/data/Transaction.interface'
import { Goal } from '../../@types/data/Goal.interface'
import { NavigationContext } from '@react-navigation/native'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader'
import { userInfo } from '../../components/userInfo'

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

interface BlockComponentProps {
	getAvailableBalance: () => void
	setDate: Dispatch<Date>
	children: string
	value: number
	owner: string
	id: string
	canEdit: boolean
}

function BlockComponent(props: BlockComponentProps) {
	const navigator = useContext(NavigationContext)
	return (
		<View className='w-full flex-row items-center justify-between mb-2 py-2'>
			<View>
				<Text variant='titleLarge' style={Oswald.regular}>
					{props.children}
				</Text>
				<Text variant='titleMedium' style={Oswald.regular}>
					R${props.value}
				</Text>
			</View>

			<View
				className='w-52 flex-row'
				style={
					props.canEdit
						? { justifyContent: 'space-between' }
						: { justifyContent: 'flex-end' }
				}
			>
				{props.canEdit ? (
					<LittleBlueButton
						onPress={() =>
							navigator.navigate('BlocksEdit', {
								userId: props.owner,
								blockId: props.id,
								blockName: props.children,
								blockValue: props.value,
								setDate: props.setDate,
								availableBalance: props.getAvailableBalance(),
							})
						}
						width={90}
					>
						Editar
					</LittleBlueButton>
				) : null}

				<LittleBlueButton
					onPress={async () => {
						navigator.navigate('LoadingModal', {
							redirect: 'Blocks',
							title: 'Cancelando...',
							barColor: 'red',
						})
						await deleteBlock(props.id, props.owner, props.setDate)
					}}
					width={90}
				>
					Cancelar
				</LittleBlueButton>
			</View>
		</View>
	)
}

async function deleteBlock(id: string, owner: string, setDate: Dispatch<Date>) {
	const { data } = await axios.delete<Block>(
		`https://finances4u-api.bohr.io/api/user/${owner}/blocks/${id}/cancel`
	)
	if (data._id == id) setDate(new Date())
}
