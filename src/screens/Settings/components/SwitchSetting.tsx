import { useState } from 'react'
import { View } from 'react-native'
import { Text, Switch } from 'react-native-paper'
import { Oswald } from '../../../styles/Oswald.font'
import { SwitchSettingProps } from '../types/SwitchSettingProps.interface'
import { getSwitchColor } from '../functions/getSwitchColor'

export function SwitchSetting(props: SwitchSettingProps) {
	const [isSwitchOn, setIsSwitchOn] = useState(props.on ? true : false)

	const valueChange = () => {
		setIsSwitchOn(!isSwitchOn)
		props.onChangeValue()
	}

	return (
		<View className='w-full flex-row items-center justify-between p-4'>
			<View className='w-4/5'>
				<Text variant='titleLarge' style={Oswald.regular}>
					{props.title}
				</Text>

				<Text variant='titleSmall' style={Oswald.regular}>
					{props.children}
				</Text>
			</View>

			<Switch
				value={isSwitchOn}
				onValueChange={valueChange}
				color={getSwitchColor(props.color)}
			/>
		</View>
	)
}
