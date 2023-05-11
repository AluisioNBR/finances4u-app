import { useContext } from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { Oswald } from '../styles/Oswald.font'
import {
	NavigationContext,
	NavigationProp,
	ParamListBase,
} from '@react-navigation/native'

interface StandardHeaderProps {
	children: string
	titleEnd?: boolean
	noMenu?: boolean
	bold?: boolean
	buttonPos?: number
	callback?: () => void
}

export function StandardHeader(props: StandardHeaderProps) {
	const navigator = useContext(NavigationContext)
	const isTitleEnd = props.titleEnd ? true : false
	const isBold = props.bold ? true : false
	const isNoMenu = props.noMenu ? true : false

	if (isNoMenu)
		return (
			<View className='flex-row items-center py-3'>
				<IconButton
					icon='keyboard-return'
					className='absolute bg-gray-1 w-11 h-11'
					style={{ left: props.buttonPos ? props.buttonPos : -160 }}
					onPress={() => {
						const callbackExec = props.callback ? props.callback : () => {}
						callbackExec()
						navigator.goBack()
					}}
				/>

				<Text
					variant='headlineLarge'
					style={isBold ? Oswald.bold : Oswald.regular}
				>
					{props.children}
				</Text>
			</View>
		)
	else
		return (
			<View
				className='w-full flex-row items-center py-3 border-b-[#00000022] border-b-[1px]'
				style={isTitleEnd ? { justifyContent: 'space-between' } : {}}
			>
				<IconButton
					icon='menu'
					size={34}
					onPress={() => openDrawer(navigator)}
				/>
				<Text
					variant='headlineLarge'
					className='pr-2'
					style={[
						isBold ? Oswald.bold : Oswald.regular,
						isTitleEnd ? {} : { textAlign: 'center', width: '70%' },
					]}
				>
					{props.children}
				</Text>
			</View>
		)
}

function openDrawer(navigator: NavigationProp<ParamListBase>) {
	// @ts-ignore
	const drawer = navigator.getParent('MenuDrawer')

	// @ts-ignore
	if (drawer) drawer.openDrawer()
}
