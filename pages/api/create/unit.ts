import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react";
import { prisma } from "../../../db";
import IsAdmin from "../../../helpers/IsAdmin";

const CreateUnit = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, classId, handouts, videos } = req.body;

    const session = await getSession({ req })

    let isAdmin = false;
    if (session) {
        isAdmin = await IsAdmin(session)
    }

    if (isAdmin) {
        const Unit = await prisma.unit.create({
            data: {
                name,
                class: { connect: { id: classId } },
                handouts,
                videos,
            }
        })
        res.json(Unit);
    } else {
        res.status(401)
    }
}

export default CreateUnit;

/*{
    "name" : "New Unit ClassId 2",
    "classId" : 2,
    "handouts" : {
    	
    },
    "videos" : {}
}*/