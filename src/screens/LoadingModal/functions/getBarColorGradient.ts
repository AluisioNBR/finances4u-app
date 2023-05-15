import colors from '../../../../colors'

export function getBarColorGradient(color: 'green' | 'red' | 'blue') {
	return color == 'green'
		? [colors.green[1], colors.green[2]]
		: color == 'red'
		? [colors.red[1], colors.red[3]]
		: [colors.blue[0], colors.blue[1]]
}
