import { StandardHeaderProps } from './types/StandardHeaderProps.interface'
import { HeaderWithReturn } from './components/HeaderWithReturn'
import { HeaderWithMenu } from './components/HeaderWithMenu'

export function StandardHeader(props: StandardHeaderProps) {
	const isNoMenu = props.noMenu ? true : false

	if (isNoMenu) return <HeaderWithReturn {...props} />
	else return <HeaderWithMenu {...props} />
}
