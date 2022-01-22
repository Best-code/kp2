import {NextApiRequest, NextApiResponse} from "next"
import { prisma } from "../../../db";

const CreteHandout = async (req : NextApiRequest, res : NextApiResponse) => {
    const {name, unitId} = req.body;
    const Unit = await prisma.handout.create({
        data: {
            name,
            unit: {connect: {id: unitId}},
        }
    })
    res.json(Unit);
}

export default CreteHandout;
