import { Context, createContext } from 'react'
import { DateContextInterface } from '../types/DateContext.interface'

export const DateContext: Context<DateContextInterface> = createContext({
	setDate: () => {},
})
