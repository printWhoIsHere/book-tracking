import { cn } from '@/lib/utils'

export default function SidebarInset({
	className,
	children,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<main
			className={cn(
				'relative flex w-full flex-1 flex-col bg-background',
				className,
			)}
			{...props}
		>
			{children}
		</main>
	)
}
