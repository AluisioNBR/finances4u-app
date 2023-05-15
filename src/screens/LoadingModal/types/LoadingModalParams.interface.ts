export interface LoadingModalParams {
	redirect: string | 'goBack'
	title?: string
	barColor?: 'green' | 'red' | 'blue'
	duration?: number
	routeParams?: any
}
