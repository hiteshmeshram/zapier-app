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

export const createZapinputSchema = z.object({
    availableTriggerId : z.string(),
    triggerName: z.string(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionName: z.string()
    }))
})