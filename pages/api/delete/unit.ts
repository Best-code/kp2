import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../db";
import { getSession } from "next-auth/react";

const DeleteUnit = async (req: NextApiRequest, res: NextApiResponse) => {
    let { name, classId } = req.body;
    name = name.substr(name.lastIndexOf("/") + 1)
    const Session = await getSession({ req })
    if (Session) {
        const Class = await prisma.unit.deleteMany({
            where: {
                name: name,
                classId: classId
            },
        })
        res.json(Class)
    }else{
        res.status(401)
    }
}

export default DeleteUnit;