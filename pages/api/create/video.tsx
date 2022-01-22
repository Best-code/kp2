import {NextApiRequest, NextApiResponse} from "next"
import { prisma } from "../../../db";

const CreateHandout = async (req : NextApiRequest, res : NextApiResponse) => {
    let {name, unitId, link} = req.body;
    if(link.indexOf('http:') == -1 && link.indexOf('https:') == -1){
        link = "https:"+link;
    }
    const Unit = await prisma.video.create({
        data: {
            name,
            link,
            unit: {connect: {id: unitId}},
        }
    })
    res.json(Unit);
}

export default CreateHandout;
