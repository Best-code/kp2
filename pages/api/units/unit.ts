import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

const GetUnit = async (req : NextApiRequest, res : NextApiResponse) => {
    const {id} = req.query
    const unit = await prisma.unit.findMany({
        where: {
            id: Number(id)
        }
    })
    res.json(unit);
}

export default GetUnit