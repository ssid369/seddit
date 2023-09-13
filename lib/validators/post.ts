import {z} from "zod"

export const postValidator = z.object({
    title: z.string().min(3,{message:"title should have a len >3"}).max(128,{message:"max 128 chars"}),
    subredditId: z.string(),
    content: z.any(),
})

export type PostCreationRequest = z.infer<typeof postValidator>