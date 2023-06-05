export function checkErrors(
	type: 'edit' | 'increment' | 'decrement',
	goalName: string,
	goalValue: string,
	value: string,
	increment: string,
	availableIncrement: number,
	availableBalance: number
) {
	console.log(`Available increment: ${availableIncrement}`)
	console.log(
		`Name is empty: ${goalName == ''}\nGoal value is NAN: ${isNaN(
			parseFloat(goalValue)
		)}\nIncrement is NAN: ${isNaN(parseInt(increment))}\nIncrement is bigger: ${
			parseInt(increment) > availableIncrement
		}`
	)
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
		(type == 'increment' && parseFloat(value) > availableBalance)
	)
		throw new Error('Change Error')
}
