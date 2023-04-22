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
	routeParams?: any
}

export function LoadingModal() {
	const navigator = useContext(NavigationContext)
	const { params } = useContext(NavigationRouteContext)
	const { redirect, routeParams } = params as LoadingModalParams

	useEffect(() => {
		setTimeout(() => {
			if (redirect == 'goBack') navigator.goBack()
			else navigator.navigate(redirect, routeParams ? routeParams : {})
		}, 5000)
	}, [])

	return (
		<View className='w-full h-full justify-center'>
			<Text
				className='absolute left-[125px] z-[3] text-gray-2 text-3xl'
				style={Oswald.bold}
			>
				Carregando...
			</Text>

			<LoadingBar />
		</View>
	)
}

function LoadingBar() {
	const rotate = {
		from: {
			transform: [{ rotate: `${0}deg` }],
		},
		to: {
			transform: [{ rotate: `${360}deg` }],
		},
	}
	return (
		<Animatable.View
			animation={rotate}
			iterationCount={Infinity}
			duration={2000}
			className='p-8 justify-center items-center'
		>
			<LinearGradient
				colors={[colors.green[1], colors.green[2]]}
				className='w-[220] h-[220] rounded-full items-center justify-center'
			>
				<View className='w-[200] h-[200] rounded-full items-center justify-center bg-white-1'></View>
			</LinearGradient>
		</Animatable.View>
	)
}
