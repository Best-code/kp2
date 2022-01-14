import {NextApiRequest, NextApiResponse} from "next"
import { prisma } from "../../../db";

const ThisClass = async (req : NextApiRequest, res : NextApiResponse) => {
    const {name} = req.query
    const thisClass = await prisma.class.findUnique({
        where: {
            name: String(name)
        }
    })
    res.json(thisClass);
}

export default ThisClass