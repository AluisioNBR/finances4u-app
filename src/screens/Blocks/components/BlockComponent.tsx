import { NavigationContext } from '@react-navigation/native'
import axios from 'axios'
import { useContext, Dispatch } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Block } from '../../../@types/data/Block.interface'
import { LittleBlueButton } from '../../../components/LittleBlueButton/LittleBlueButton'
import { Oswald } from '../../../styles/Oswald.font'
import { BlockComponentProps } from '../types/BlockComponentProps.interface'

export function BlockComponent(props: BlockComponentProps) {
	const navigator = useContext(NavigationContext)

	const editBlock = () =>
		navigator.navigate('BlocksEdit', {
			userId: props.owner,
			blockId: props.id,
			blockName: props.children,
			blockValue: props.value,
			setDate: props.setDate,
			availableBalance: props.getAvailableBalance(),
		})

	const cancelBlock = async () => {
		navigator.navigate('LoadingModal', {
			redirect: 'Blocks',
			title: 'Cancelando...',
			barColor: 'red',
		})
		await deleteBlock(props.id, props.owner, props.setDate)
	}

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
					<LittleBlueButton onPress={editBlock} width={90}>
						Editar
					</LittleBlueButton>
				) : null}

				<LittleBlueButton onPress={cancelBlock} width={90}>
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
