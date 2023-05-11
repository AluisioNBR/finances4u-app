export interface Sugestion {
	_id: string
	owner: string
	title: string
	sugestion: string
	response: string
	status: 'awaiting' | 'answered' | 'read'
}
