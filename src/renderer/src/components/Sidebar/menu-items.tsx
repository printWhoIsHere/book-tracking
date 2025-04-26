import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/providers/sidebar-provider'
import { VariantProps } from 'class-variance-authority'

const SidebarGroup = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			data-sidebar='group'
			className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
			{...props}
		/>
	)
})
SidebarGroup.displayName = 'SidebarGroup'

const SidebarGroupLabel = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<'div'> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'div'

	return (
		<Comp
			ref={ref}
			data-sidebar='group-label'
			className={cn(
				'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none cursor-default select-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:-mt-8',
				className,
			)}
			{...props}
		/>
	)
})
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

const SidebarMenu = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		data-sidebar='menu'
		className={cn('flex w-full min-w-0 flex-col gap-1', className)}
		{...props}
	/>
))
SidebarMenu.displayName = 'SidebarMenu'

const SidebarMenuItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
	<li
		ref={ref}
		data-sidebar='menu-item'
		className={cn('group/menu-item relative', className)}
		{...props}
	/>
))
SidebarMenuItem.displayName = 'SidebarMenuItem'

const SidebarMenuButton = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<'button'> & {
		asChild?: boolean
		variant?: VariantProps<typeof buttonVariants>['variant']
		tooltip?: string | React.ComponentProps<typeof TooltipContent>
	}
>(
	(
		{ asChild = false, variant = 'ghost', tooltip, className, ...props },
		ref,
	) => {
		const Comp = asChild ? Slot : 'button'
		const { isMobile, state } = useSidebar()

		const button = (
			<Comp
				ref={ref}
				data-sidebar='menu-button'
				className={cn(
					buttonVariants({ variant, className }),
					'peer/menu-button flex h-10 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding]  focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
					state === 'collapsed' ? 'justify-center' : 'justify-start',
				)}
				{...props}
			/>
		)

		if (!tooltip) {
			return button
		}

		if (typeof tooltip === 'string') {
			tooltip = {
				children: tooltip,
			}
		}

		return (
			<Tooltip>
				<TooltipTrigger asChild>{button}</TooltipTrigger>
				<TooltipContent
					side='right'
					align='center'
					hidden={state !== 'collapsed' || isMobile}
					{...tooltip}
				/>
			</Tooltip>
		)
	},
)
SidebarMenuButton.displayName = 'SidebarMenuButton'

export {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
}
