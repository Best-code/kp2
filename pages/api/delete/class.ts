import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../db";
import { getSession } from "next-auth/react";

const DeleteClass = async (req: NextApiRequest, res: NextApiResponse) => {
    let { name } = req.body;
    name = name.substr(name.lastIndexOf("/") + 1)
    const Session = await getSession({ req })
    if (Session) {
        const Class = await prisma.class.delete({
            where: {
                name: name
            },
        })
        res.json(Class)
    }else{
        res.status(401)
    }
}

export default DeleteClass;