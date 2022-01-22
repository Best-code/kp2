import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "next-auth/react";
import { prisma } from "../../db";
import { Role } from "@prisma/client";

const ApiAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email } = req.query;
    
    const admin = await prisma.user.findFirst({
        where: {
            email: String(email)
        }
    })
    if (admin)
        res.json(admin.role == Role.ADMIN)
}

export default ApiAdmin