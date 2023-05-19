import axios from 'axios'
import { Block } from '../@types/data/Block.interface'
import { Goal } from '../@types/data/Goal.interface'
import { userInfo } from './userInfo'

export async function getUserBalanceDecrement() {
	let finalDecrement = 0
	const goals = await axios.get<Goal[]>(
		`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/goals/`
	)
	goals.data.forEach(
		(goal) => (finalDecrement = finalDecrement + goal.currentValue)
	)
	const blocks = await axios.get<Block[]>(
		`https://finances4u-api.bohr.io/api/user/${userInfo.userId}/blocks`
	)
	blocks.data.forEach(
		(block) => (finalDecrement = finalDecrement + block.value)
	)
	return finalDecrement
}
