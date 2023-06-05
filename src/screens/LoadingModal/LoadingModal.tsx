import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'
import { Oswald } from '../../styles/Oswald.font'
import { LoadingModalParams } from './types/LoadingModalParams.interface'
import { ProgressBar } from './components/LoadingBar'

export function LoadingModal() {
	const navigator = useContext(NavigationContext)
	const { params } = useContext(NavigationRouteContext)
	const { redirect, title, barColor, duration, routeParams } =
		params as LoadingModalParams

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
		setTimeout(
			() => {
				if (redirect == 'goBack') navigator.goBack()
				else navigator.navigate(redirect, routeParams ? routeParams : {})
			},
			duration ? duration : 2000
		)
	}, [])

	return (
		<View
			className='w-full h-full justify-center items-center'
			style={{ gap: 16 }}
		>
			<ProgressBar barColor={barColor} duration={duration ? duration : 2000} />
			<Text
				className='text-center text-gray-2 text-2xl w-[182.5]'
				style={Oswald.bold}
			>
				{title ? title : 'Carregando...'}
			</Text>
		</View>
	)
}

/*
<LoadingBar
	barColor={barColor ? barColor : 'green'}
	duration={duration ? duration : 2000}
/>
*/
