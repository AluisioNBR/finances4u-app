import { useEffect, useContext } from 'react'
import { View, Linking } from 'react-native'
import { Text } from 'react-native-paper'
import { Oswald } from '../../styles/Oswald.font'
import { NavigationContext } from '@react-navigation/native'
import { LittleBlueButton } from '../../components/LittleBlueButton'
import appConfig from '../../../app.json'
import { StandardScreen } from '../../components/StandardScreen'
import { StandardHeader } from '../../components/StandardHeader'

export function AboutScreen() {
	const navigator = useContext(NavigationContext)

	useEffect(() => {
		// @ts-ignore
		navigator.getParent('MenuDrawer').setOptions({ swipeEnabled: true })
	}, [])

	const navigateTo = async (url: string) => {
		if (await Linking.canOpenURL(url)) await Linking.openURL(url)
	}

	return (
		<StandardScreen>
			<StandardHeader>Sobre</StandardHeader>

			<View className='w-full items-start'>
				<Text variant='headlineMedium' className='mb-3' style={Oswald.regular}>
					Finanças 4U
				</Text>

				<View className='ml-3'>
					<Text variant='titleLarge' className='mb-3' style={Oswald.regular}>
						Versão: {appConfig.expo.version}
					</Text>

					<Text variant='titleLarge' className='mb-3' style={Oswald.regular}>
						Desenvolvido por AluisioNBR
					</Text>

					<Text variant='titleLarge' className='mb-6' style={Oswald.regular}>
						Licença:{' '}
						<Text className='text-blue-2' style={Oswald.bold}>
							MIT
						</Text>
					</Text>
				</View>

				<View className='w-full items-start'>
					<Text
						variant='headlineMedium'
						className='mb-3'
						style={Oswald.regular}
					>
						Github
					</Text>

					<View className='gap-2'>
						<LittleBlueButton
							onPress={async () =>
								await navigateTo('https://github.com/AluisioNBR/finances4u-app')
							}
						>
							Acesse o código fonte
						</LittleBlueButton>

						<LittleBlueButton
							onPress={async () =>
								await navigateTo('https://github.com/AluisioNBR')
							}
						>
							Veja outros projetos
						</LittleBlueButton>
					</View>
				</View>
			</View>
		</StandardScreen>
	)
}
