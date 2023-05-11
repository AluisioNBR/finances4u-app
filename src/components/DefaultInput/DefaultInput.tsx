import { useState } from 'react'
import { View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { DefaultInputProps } from './types/DefaultInputProps.interface'
import { Oswald } from '../../styles/Oswald.font'
import colors from '../../../colors'

export function DefaultInput(props: DefaultInputProps) {
	const [labelVisibility, setLabelVisibility] = useState(true)
	const [isFocus, setIsFocus] = useState(false)

	const Label = (
		<Text
			className='text-[16px]'
			style={props.bold ? Oswald.bold : Oswald.regular}
		>
			{props.label}{' '}
			<Text className='text-red-1' style={Oswald.bold}>
				{props.required ? '*' : ''}
			</Text>
		</Text>
	)

	return (
		<View className='w-full'>
			{labelVisibility ? Label : null}
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
					isFocus ? { borderWidth: 3 } : { borderWidth: 4 },
				]}
				label={labelVisibility ? '' : Label}
				onFocus={() => {
					setIsFocus(true)
					setLabelVisibility(false)
				}}
				onBlur={() => {
					setIsFocus(false)
					setLabelVisibility(true)
				}}
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
