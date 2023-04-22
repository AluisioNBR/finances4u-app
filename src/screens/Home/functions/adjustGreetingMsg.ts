import React from 'react'

export function adjustGreetingMsg(
	date: Date,
	setGreetingMsg: React.Dispatch<string>
) {
	const [hour, min, sec] = date.toLocaleTimeString().split(':')
	if (isAfternooon(hour)) setGreetingMsg('Boa Tarde')
	else if (isEvening(hour, min, sec)) setGreetingMsg('Boa Noite')
	else setGreetingMsg('Bom dia')
}

function isAfternooon(hour: string) {
	return parseInt(hour) >= 12 && parseInt(hour) < 18
}

function isEvening(hour: string, min: string, sec: string) {
	return (
		parseInt(hour) >= 18 &&
		parseInt(hour) <= 23 &&
		parseInt(min) <= 59 &&
		parseInt(sec) <= 59
	)
}
