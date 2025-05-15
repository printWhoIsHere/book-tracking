import {
	useMutation,
	useQueryClient,
	MutationFunction,
} from '@tanstack/react-query'
import { VariantProps } from 'class-variance-authority'
import { toast, useToast } from '@/hooks/useToast'

interface Options<TData> {
	queryKey: string[]
	successMessage: string
	errorMessage: string
	toastVariant?: VariantProps<typeof toast>['variant']
	onSuccess?: (data: TData) => void
	onError?: (error: unknown) => void
	onSettled?: () => void
}

export function useTypedMutation<TVariables, TData = unknown>(
	mutationFn: MutationFunction<TData, TVariables>,
	options: Options<TData>,
) {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	return useMutation<TData, unknown, TVariables>({
		mutationFn,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: options.queryKey })
			toast({
				description: options.successMessage,
				variant: options.toastVariant || 'success',
			})
			options.onSuccess?.(data)
		},
		onError: (error) => {
			toast({
				description: options.errorMessage,
				variant: options.toastVariant || 'destructive',
			})
			options.onError?.(error)
		},
		onSettled: () => options.onSettled?.(),
	})
}
