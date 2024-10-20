import  { Response, Router } from 'express'
import { signinSchema, signupSchema } from '../types';
import { prisma } from '../db';
import jwt from'jsonwebtoken'
import { JWT_SECRET } from '../config';
import bcrypt from 'bcrypt'
import { authMiddleware } from '../middleware';

const router = Router();

router.post('/signup',async (req,res)=>{
    const { name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password,10);

    const parsedInput = signupSchema.safeParse(req.body);

    if (!parsedInput.success) {
         res.status(404).json({
            message: "invalid credentials"
        })
    }

    try {
        await prisma.user.create({
            data: {
                name,
                email: username,
                password: hashedPassword
            }
        })

        res.json({
            message: "signup successful"
        })
    } catch(e) {
        res.status(403).json({
            message: "username already exists"
        })
    }
})

router.post('/signin',async (req,res)=>{
    const { username,password } = req.body;
    const parsedInput = signinSchema.safeParse(req.body);

    if (!parsedInput.success) {
        res.status(404).json({
            message: "invalid credentials"
        })
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: username,
        }
    })

    if(!existingUser) {
        res.status(404).json({
            message: "user not found with this credentials "
        })
    }

    const verifiedPassword = await bcrypt.compare(password,(existingUser?.password || ""));

    if(!verifiedPassword) {
        res.status(404).json({message: "invalid password"})
    }

    const token = jwt.sign({
        id: existingUser?.id
        },JWT_SECRET)

        res.json({
            message: "logged in successfully",
            token
        })
})

//@ts-ignore
router.get('/',authMiddleware, async (req,res)=>{
    //@ts-ignore
    const userId = req.id;

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                name: true,
                email: true
            }
        })

        if (!user) {
           return  res.status(404).json({
                message: "user not found"
        })
        }

        res.json({user});

    } catch(e) {
        console.log(e);
        res.status(403).json({
            message: "user not found"
        })
    }
})

export default router;