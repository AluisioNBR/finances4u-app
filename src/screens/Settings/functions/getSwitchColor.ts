import colors from '../../../../colors'

export function getSwitchColor(color: 'green' | 'red' | 'blue') {
	return color == 'green'
		? colors.green[1]
		: color == 'red'
		? colors.red[1]
		: colors.blue[0]
}
