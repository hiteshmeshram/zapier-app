import { z } from 'zod'

export const signupSchema = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string()
})

export const signinSchema = z.object({
    username: z.string(),
    password: z.string()
})