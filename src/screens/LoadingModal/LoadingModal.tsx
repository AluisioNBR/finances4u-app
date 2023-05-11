import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import {
	NavigationContext,
	NavigationRouteContext,
} from '@react-navigation/native'

import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../../colors'
import { Oswald } from '../../styles/Oswald.font'

interface LoadingModalParams {
	redirect: string | 'goBack'
	title?: string
	barColor?: 'green' | 'red' | 'blue'
	duration?: number
	routeParams?: any
}

export function LoadingModal() {
	const navigator = useContext(NavigationContext)
	const { params } = useContext(NavigationRouteContext)
	const { redirect, title, barColor, duration, routeParams } =
		params as LoadingModalParams

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: false })
		setTimeout(() => {
			if (redirect == 'goBack') navigator.goBack()
			else {
				navigator.navigate(redirect, routeParams ? routeParams : {})
			}
		}, 5000)
	}, [])

	return (
		<View className='w-full h-full justify-center'>
			<Text
				className='absolute left-[115px] z-[3] text-center text-gray-2 text-3xl w-[182.5]'
				style={Oswald.bold}
			>
				{title ? title : 'Carregando...'}
			</Text>

			<LoadingBar
				barColor={barColor ? barColor : 'green'}
				duration={duration ? duration : 2000}
			/>
		</View>
	)
}

interface LoadingBarProps {
	barColor: 'green' | 'red' | 'blue'
	duration: number
}

function LoadingBar(props: LoadingBarProps) {
	const rotate = {
		from: {
			transform: [{ rotate: `${0}deg` }],
		},
		to: {
			transform: [{ rotate: `${360}deg` }],
		},
	}
	const barColor =
		props.barColor == 'green'
			? [colors.green[1], colors.green[2]]
			: props.barColor == 'red'
			? [colors.red[1], colors.red[3]]
			: [colors.blue[0], colors.blue[1]]
	return (
		<Animatable.View
			animation={rotate}
			iterationCount={Infinity}
			duration={props.duration}
			className='p-8 justify-center items-center'
		>
			<LinearGradient
				colors={barColor}
				className='w-[220] h-[220] rounded-full items-center justify-center'
			>
				<View className='w-[200] h-[200] rounded-full items-center justify-center bg-white-1'></View>
			</LinearGradient>
		</Animatable.View>
	)
}
