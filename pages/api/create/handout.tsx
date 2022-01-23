import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../db";
import { getSession } from "next-auth/react";
import IsAdmin from "../../../helpers/IsAdmin";

const CreteHandout = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, unitId } = req.body;

    const session = await getSession({ req })

    let isAdmin = false;
    if (session) {
        isAdmin = await IsAdmin(session)
    }

    if (isAdmin) {
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
