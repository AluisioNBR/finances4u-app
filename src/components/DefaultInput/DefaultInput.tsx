import { View, TextInput } from 'react-native'
import { Text } from 'react-native-paper'
import { DefaultInputProps } from './types/DefaultInputProps.interface'
import { Oswald } from '../../styles/Oswald.font'

export function DefaultInput(props: DefaultInputProps) {
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
				multiline={props.multiline ? true : false}
				numberOfLines={props.rows}
				autoCapitalize='none'
				secureTextEntry={props.secure ? true : false}
				onChangeText={(text) => props.onChange(text)}
				style={[
					Oswald.regular,
					{
						borderRadius: props.rounded ? props.rounded : 75,
					},
				]}
				className='w-full text-[16px] bg-white-1 border-green-2 border-[1px] p-2'
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
