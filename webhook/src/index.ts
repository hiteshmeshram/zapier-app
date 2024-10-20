
import { PrismaClient } from '@prisma/client';
import express from 'express'

const app = express();
const prisma = new PrismaClient();

app.use(express.json());


app.post('/webhookurl/:zapId/:userId',async (req,res)=>{
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const metadata = req.body;

    await prisma.$transaction(async tx => {
        const zaprun = await tx.zaprun.create({
            data: {
                zapId,
            }
        })

        await tx.zaprunoutbox.create({
            data: {
                zaprunId: zaprun.id
            }
        })
    })

    res.json({message: " webhook received"})
})