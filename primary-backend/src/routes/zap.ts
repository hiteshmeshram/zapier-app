
import { Router } from 'express'
import { authMiddleware } from '../middleware';
import { createZapinputSchema } from '../types';
import { prisma } from '../db';

const router = Router();

//to create a new zap
//@ts-ignore
router.post('/',authMiddleware,async (req,res)=>{
    //@ts-ignore
    const userId = req.id;
    const body = req.body;

    const parsedData = createZapinputSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(403).json({
            message: "wrong inputs"
        })
    }

    const zapId = await prisma.$transaction(async tx=>{
        const zap = await tx.zap.create({
            data: {
                userId: userId,
            }
        })

        const trigger = await tx.trigger.create({
            data: {
                name: parsedData.data.triggerName,
                zapId: zap.id,
                availableTriggerId: parsedData.data.availableTriggerId
                
            }
        })

        
        const action = await tx.action.createMany({
            data: parsedData.data.actions.map((action)=>({
                zapId: zap.id,
                name: action.actionName,
                availableActionId: action.availableActionId
            }))
        })

        return zap.id;
    })

    res.json({zapId});

})

//to get all zaps for a specific user
//@ts-ignore
router.get('/',authMiddleware,async (req,res)=>{
    //@ts-ignore
    const userId = req.id;

    const zaps = await prisma.zap.findMany({
        where: {
            userId: userId
        },
        include: {
            trigger: {
                include: {
                    type: true
                }
            },
            actions: {
                include: {
                    type: true
                }
            }
        }
    })

    res.json({zaps});
})

//to get a single zap for specific user
//@ts-ignore
router.get('/:zapId',authMiddleware,async (req,res)=>{
    //@ts-ignore
    const userId = req.id;
    const zapId = req.params.zapId;

    const zap = await prisma.zap.findFirst({
        where: {
            userId,
            id: zapId
        },
        include: {
            trigger: {
                include: {
                    type: true
                }
            },
            actions: {
                include: {
                    type: true
                }
            }
        }
    })
})

export default router;