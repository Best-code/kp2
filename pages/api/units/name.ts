import {NextApiRequest, NextApiResponse} from "next"
import { prisma } from "../../../db";

const ThisClass = async (req : NextApiRequest, res : NextApiResponse) => {
    const {name} = req.query
    const thisClass = await prisma.unit.findFirst({
        where: {
            name: String(name)
        }
    })
    if(thisClass)
        res.json(thisClass.id);
}

export default ThisClass