export function checkErrors(
	type: 'edit' | 'increment' | 'decrement',
	goalName: string,
	goalValue: string,
	value: string,
	increment: string,
	availableIncrement: number,
	getAvailableBalance: () => number
) {
	if (
		type == 'edit' &&
		(goalName == '' ||
			isNaN(parseFloat(goalValue)) ||
			isNaN(parseInt(increment)) ||
			parseInt(increment) > availableIncrement)
	)
		throw new Error('Edit Error')
	else if (
		(type != 'edit' && isNaN(parseFloat(value))) ||
		(type == 'increment' && parseFloat(value) > getAvailableBalance())
	)
		throw new Error('Change Error')
}
