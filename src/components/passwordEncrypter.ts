export function passwordEncrypter(password: string, newPassword: string) {
	let finalPassword = ''
	for (const iterator of newPassword) {
		if (iterator == '*') continue
		finalPassword = password + iterator
	}
	return finalPassword
}
