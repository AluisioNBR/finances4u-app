export interface Doubt {
	_id: string
	doubt: string
	response: string
	status: 'awaiting' | 'answered' | 'read'
}
