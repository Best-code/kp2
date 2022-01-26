import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../db";
import { getSession } from "next-auth/react";

const DeleteHandout = async (req: NextApiRequest, res: NextApiResponse) => {
    let { name, unitId } = req.body;
    name = name.substr(name.lastIndexOf("/") + 1)
    const Session = await getSession({ req })
    if (Session) {
        const Class = await prisma.handout.deleteMany({
            where: {
                name: name,
                unitId: unitId
            },
        })
        res.json(Class)
    }else{
        res.status(401)
    }
}

export default DeleteHandout;