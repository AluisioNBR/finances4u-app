import {
	NavigationContext,
	NavigationProp,
	ParamListBase,
} from '@react-navigation/native'
import { useContext } from 'react'
import { View } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { Oswald } from '../../../styles/Oswald.font'
import { StandardHeaderProps } from '../types/StandardHeaderProps.interface'

export function HeaderWithMenu(props: StandardHeaderProps) {
	const navigator = useContext(NavigationContext)
	const isTitleEnd = props.titleEnd ? true : false
	const isBold = props.bold ? true : false

	return (
		<View
			className='w-full flex-row items-center py-3 border-b-[#00000022] border-b-[1px]'
			style={isTitleEnd ? { justifyContent: 'space-between' } : {}}
		>
			<IconButton icon='menu' size={34} onPress={() => openDrawer(navigator)} />
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
