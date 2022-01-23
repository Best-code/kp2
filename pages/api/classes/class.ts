import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react";
import { prisma } from "../../../db";

const ThisClass = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.query
    const thisClass = await prisma.class.findFirst({
        where: {
            name: String(name)
        }
    })
    res.json(thisClass);

}

export default ThisClass