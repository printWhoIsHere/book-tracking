import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

interface ColorPickerProps {
	initialColor: string
	onColorChange: (color: string) => void
}

export function ColorPicker({ initialColor, onColorChange }: ColorPickerProps) {
	const [color, setColor] = useState(initialColor)

	const handleChange = (newColor: string) => {
		setColor(newColor)
		onColorChange(newColor)
	}

	return (
		<Popover>
			<PopoverTrigger
				className='w-10 h-8 rounded-lg border'
				style={{ backgroundColor: color }}
			/>
			<PopoverContent className='w-auto p-2'>
				<HexColorPicker color={color} onChange={handleChange} />
			</PopoverContent>
		</Popover>
	)
}
