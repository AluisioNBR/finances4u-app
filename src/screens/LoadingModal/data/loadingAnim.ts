import { Keyframe } from 'react-native-reanimated'

export const loadingAnim = new Keyframe({
	from: {
		width: 0,
	},
	to: {
		width: 256,
	},
})
