import { z } from 'zod'

const ProfileSchema = z.object({
	name: z.string().min(1),
})

export { ProfileSchema }
