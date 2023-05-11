export interface UploadImgButtonProps {
	icon: string
	children: string
	pickImage: () => Promise<void>
	roundedFull?: boolean
	borderColor?: string
	size: number
	width: number
	height: number
}
