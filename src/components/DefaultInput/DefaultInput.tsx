import { useState } from 'react'
import { View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { DefaultInputProps } from './types/DefaultInputProps.interface'
import { Oswald } from '../../styles/Oswald.font'
import colors from '../../../colors'

export function DefaultInput(props: DefaultInputProps) {
	const [isFocus, setIsFocus] = useState(false)

	const Label = (
		<View>
			<Text
				className='text-[16px]'
				style={props.bold ? Oswald.bold : Oswald.regular}
			>
				{props.label}{' '}
				<Text className='text-red-1' style={Oswald.bold}>
					{props.required ? '*' : ''}
				</Text>
			</Text>
		</View>
	)

	return (
		<View className='w-full'>
			{Label}
			<TextInput
				inputMode='text'
				mode='outlined'
				multiline={props.multiline ? true : false}
				contentStyle={props.height ? { height: props.height } : {}}
				outlineStyle={[
					{
						borderRadius: props.rounded ? props.rounded : 75,
						borderColor: colors.green[2],
					},
					isFocus ? { borderWidth: 2 } : { borderWidth: 1 },
				]}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChangeText={(text) => props.onChange(text)}
				style={[Oswald.regular, { flexWrap: 'wrap' }]}
				className={`w-full text-[16px] bg-white`}
				value={props.children}
			/>
			{props.helpMessage ? (
				<Text className='w-full text-center text-[14px]' style={Oswald.regular}>
					{props.helpMessage}
				</Text>
			) : null}
		</View>
	)
}
