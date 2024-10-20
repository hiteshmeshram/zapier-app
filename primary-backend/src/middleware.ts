import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "./config";

// export interface ReqInterface extends Request{
//     id: string
// }

export function authMiddleware(req: Request,res: Response,next: NextFunction) {
    console.log("inside middleware")
    const token = req.headers["authorization"];

    if (!token) {
       return res.status(403).json({
            message: "unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        console.log('after decoded')
        //@ts-ignore
        req.id = decoded.id;
        next();

    } catch(e) {
        return res.status(411).json({
            message: "invalid"
        })
    }
  
}

