import { IconButton } from 'react-native-paper'
import { View, TouchableWithoutFeedback, Image } from 'react-native'
import colors from '../../colors'

interface UploadImgButtonProps {
	icon: string
	children: string
	pickImage: () => Promise<void>
	roundedFull?: boolean
	borderColor?: string
	size: number
	width: number
	height: number
}

export function UploadImgButton(props: UploadImgButtonProps) {
	return (
		<>
			{!props.children || props.children == '' ? (
				<IconButton
					icon={props.icon}
					iconColor={'#fff'}
					containerColor={colors.green[2]}
					style={[
						{ borderRadius: props.roundedFull ? 75 : 4 },
						props.borderColor
							? { borderColor: props.borderColor, borderWidth: 2 }
							: {},
					]}
					size={props.size}
					onPress={props.pickImage}
				/>
			) : (
				<TouchableWithoutFeedback onPress={props.pickImage}>
					<View
						style={[
							{ width: props.width, height: props.height },
							{ borderRadius: props.roundedFull ? 75 : 4 },
							props.borderColor
								? { borderColor: props.borderColor, borderWidth: 2 }
								: {},
						]}
					>
						<Image
							source={{ uri: `data:image/png;base64,${props.children}` }}
							className='w-full h-full'
							style={{ borderRadius: props.roundedFull ? 75 : 4 }}
						/>
					</View>
				</TouchableWithoutFeedback>
			)}
		</>
	)
}
