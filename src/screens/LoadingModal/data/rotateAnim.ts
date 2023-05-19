import { Keyframe } from 'react-native-reanimated'

export const rotateAnim = new Keyframe({
	from: {
		transform: [{ rotate: `${0}deg` }],
	},
	25: { transform: [{ rotate: `${360}deg` }] },
	26: { transform: [{ rotate: `${0}deg` }] },
	50: { transform: [{ rotate: `${360}deg` }] },
	51: { transform: [{ rotate: `${0}deg` }] },
	75: { transform: [{ rotate: `${360}deg` }] },
	76: { transform: [{ rotate: `${0}deg` }] },
	to: {
		transform: [{ rotate: `${360}deg` }],
	},
})
