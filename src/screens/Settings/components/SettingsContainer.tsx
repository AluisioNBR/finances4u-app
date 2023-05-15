import axios from 'axios'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { User } from '../../../@types/data/User.interface'
import { Oswald } from '../../../styles/Oswald.font'
import { SettingsContainerProps } from '../types/SettingsContainerProps.interface'
import { SettingActionButton } from './SettingActionButton'
import { SwitchSetting } from './SwitchSetting'

export function SettingsContainer(props: SettingsContainerProps) {
	return (
		<View>
			<SwitchSetting
				title='Incremento automático'
				color='green'
				on={props.autoIncrement}
				onChangeValue={async () => {
					await axios.patch<User>(
						`https://finances4u-api.bohr.io/api//user/${props._id}/change/autoIncrement/`
					)
				}}
			>
				Ao adcionar dinheiro, as metas receberão investimento automáticamente
			</SwitchSetting>

			<SwitchSetting
				title='Edição de Bloqueios'
				color='green'
				on={props.blocksEdit}
				onChangeValue={async () => {
					await axios.patch<User>(
						`https://finances4u-api.bohr.io/api//user/${props._id}/change/blocksEdit/`
					)
				}}
			>
				Permite com que o usuário edite informações sobre bloqueios
			</SwitchSetting>

			<SettingActionButton
				userId={props._id}
				password={props.password}
				title='Alterar Nome de Usuário'
				color='blue'
				action='changeName'
			>
				Altera o nome de usuário da sua conta
			</SettingActionButton>

			<SettingActionButton
				userId={props._id}
				password={props.password}
				title='Deletar Conta'
				color='red'
				action='deleteAccount'
			>
				<>
					Encerra e deleta sua conta.{' '}
					<Text className='text-white-1' style={Oswald.bold}>
						Atenção, essa ação é irreversível!
					</Text>
				</>
			</SettingActionButton>
		</View>
	)
}
