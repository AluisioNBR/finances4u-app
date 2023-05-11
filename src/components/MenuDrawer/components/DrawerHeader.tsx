import { DrawerHeaderProps } from '../types/DrawerHeaderProps.interface'
import { View, Image } from 'react-native'
import { Text } from 'react-native-paper'
import colors from '../../../../colors'
import { Oswald } from '../../../styles/Oswald.font'
import { UploadImgButton } from '../../UploadImgButton/UploadImgButton'

export function DrawerHeader(props: DrawerHeaderProps) {
	const { profilePic, userData } = props

	return (
		<View className='w-full h-64 bg-[#fff] px-4 pt-16 pb-8' style={{ gap: 16 }}>
			<View className='flex-row items-center gap-2'>
				<Image
					source={require('../../assets/mini_icon.png')}
					className='w-[48px] h-[48px] rounded-full'
				/>
				<Text variant='titleLarge' style={Oswald.regular}>
					Finanças
				</Text>
			</View>

			<View className='justify-start'>
				<UploadImgButton
					icon='account'
					size={42}
					width={64}
					height={64}
					roundedFull
					pickImage={async () => {}}
					borderColor={colors.black[1]}
				>
					{profilePic}
				</UploadImgButton>

				<Text variant='titleMedium' style={Oswald.medium}>
					{userData.username}
				</Text>

				<Text variant='titleSmall' style={Oswald.light}>
					R${userData.balance}
				</Text>
			</View>
		</View>
	)
}
