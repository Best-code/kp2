import { NextApiRequest, NextApiResponse} from 'next';
import { getSession } from "next-auth/react";
import { prisma } from "../../db";
import { Role } from "@prisma/client";

const ApiAdmin = async (req : NextApiRequest, res : NextApiResponse) => {
    const {email} = req.query;
    const Session = await getSession({req})
    if(Session){  
        const admin = await prisma.user.findFirst({
            where:{
                email: String(email)
            }
        })
        res.json(admin.role == Role.ADMIN)
    }else{
        res.status(401)
    }
}

export default ApiAdmin