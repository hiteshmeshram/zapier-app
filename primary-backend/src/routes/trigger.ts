import { Router } from 'express'
import { prisma } from '../db';

const triggerRouter = Router();

triggerRouter.get('/available',async (req,res)=>{
    const availableTriggers = await prisma.availableTrigger.findMany({});
    res.json({availableTriggers})
})

export default triggerRouter;