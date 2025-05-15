import { Button } from '@/components/ui/button'

export function MagneticButton({ children }: { children: React.ReactNode }) {
	const springOptions = { bounce: 0.1 }

	return (
		<Magnetic
			intensity={0.2}
			springOptions={springOptions}
			actionArea='global'
			range={200}
		>
			<Button
				type='button'
				className='inline-flex items-center rounded-lg border border-zinc-100 bg-zinc-100 px-4 py-2 text-sm text-zinc-950 transition-all duration-200 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600'
			>
				<Magnetic
					intensity={0.1}
					springOptions={springOptions}
					actionArea='global'
					range={200}
				>
					<span>{children}</span>
				</Magnetic>
			</Button>
		</Magnetic>
	)
}

import React, { useState, useEffect, useRef } from 'react'
import {
	motion,
	useMotionValue,
	useSpring,
	type SpringOptions,
} from 'motion/react'

const SPRING_CONFIG = { stiffness: 26.7, damping: 4.1, mass: 0.2 }

export type MagneticProps = {
	children: React.ReactNode
	intensity?: number
	range?: number
	actionArea?: 'self' | 'parent' | 'global'
	springOptions?: SpringOptions
}

export function Magnetic({
	children,
	intensity = 0.6,
	range = 100,
	actionArea = 'self',
	springOptions = SPRING_CONFIG,
}: MagneticProps) {
	const [isHovered, setIsHovered] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const springX = useSpring(x, springOptions)
	const springY = useSpring(y, springOptions)

	useEffect(() => {
		const calculateDistance = (e: MouseEvent) => {
			if (ref.current) {
				const rect = ref.current.getBoundingClientRect()
				const centerX = rect.left + rect.width / 2
				const centerY = rect.top + rect.height / 2
				const distanceX = e.clientX - centerX
				const distanceY = e.clientY - centerY

				const absoluteDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

				if (isHovered && absoluteDistance <= range) {
					const scale = 1 - absoluteDistance / range
					x.set(distanceX * intensity * scale)
					y.set(distanceY * intensity * scale)
				} else {
					x.set(0)
					y.set(0)
				}
			}
		}

		document.addEventListener('mousemove', calculateDistance)

		return () => {
			document.removeEventListener('mousemove', calculateDistance)
		}
	}, [ref, isHovered, intensity, range])

	useEffect(() => {
		if (actionArea === 'parent' && ref.current?.parentElement) {
			const parent = ref.current.parentElement

			const handleParentEnter = () => setIsHovered(true)
			const handleParentLeave = () => setIsHovered(false)

			parent.addEventListener('mouseenter', handleParentEnter)
			parent.addEventListener('mouseleave', handleParentLeave)

			return () => {
				parent.removeEventListener('mouseenter', handleParentEnter)
				parent.removeEventListener('mouseleave', handleParentLeave)
			}
		} else if (actionArea === 'global') {
			setIsHovered(true)
		}

		return undefined
	}, [actionArea])

	const handleMouseEnter = () => {
		if (actionArea === 'self') {
			setIsHovered(true)
		}
	}

	const handleMouseLeave = () => {
		if (actionArea === 'self') {
			setIsHovered(false)
			x.set(0)
			y.set(0)
		}
	}

	return (
		<motion.div
			ref={ref}
			onMouseEnter={actionArea === 'self' ? handleMouseEnter : undefined}
			onMouseLeave={actionArea === 'self' ? handleMouseLeave : undefined}
			style={{
				x: springX,
				y: springY,
			}}
		>
			{children}
		</motion.div>
	)
}
