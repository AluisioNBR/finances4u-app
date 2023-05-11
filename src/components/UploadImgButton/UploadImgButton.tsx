import { IconButton } from 'react-native-paper'
import { View, TouchableWithoutFeedback, Image } from 'react-native'
import colors from '../../../colors'
import { UploadImgButtonProps } from './types/UploadImgButtonProps'

export function UploadImgButton(props: UploadImgButtonProps) {
	const width = { width: props.width, height: props.height }
	const rounded = { borderRadius: props.roundedFull ? 75 : 4 }
	const borderColor = props.borderColor
		? { borderColor: props.borderColor, borderWidth: 2 }
		: {}

	return (
		<>
			{!props.children || props.children == '' ? (
				<IconButton
					icon={props.icon}
					iconColor={'#fff'}
					containerColor={colors.green[2]}
					style={[rounded, borderColor]}
					size={props.size}
					onPress={props.pickImage}
				/>
			) : (
				<TouchableWithoutFeedback onPress={props.pickImage}>
					<View style={[width, rounded, borderColor]}>
						<Image
							source={{ uri: `data:image/png;base64,${props.children}` }}
							className='w-full h-full'
							style={rounded}
						/>
					</View>
				</TouchableWithoutFeedback>
			)}
		</>
	)
}
