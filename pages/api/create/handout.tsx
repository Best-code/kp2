import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../db";
import { getSession } from "next-auth/react";

const CreteHandout = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, unitId } = req.body;
    const Session = await getSession({ req })
    if (Session) {
        const Unit = await prisma.handout.create({
            data: {
                name,
                unit: { connect: { id: unitId } },
            }
        })
        res.json(Unit);
    } else {
        res.status(401)
    }
}

export default CreteHandout;
