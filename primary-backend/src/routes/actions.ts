import { Router } from "express"
import { prisma } from "../db";

const actionRouter = Router();

actionRouter.get('/available',async (req,res)=>{
    const availableActions = await prisma.availableAction.findMany({});
    res.json({availableActions});
})

export default actionRouter;