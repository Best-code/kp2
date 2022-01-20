import {NextApiRequest, NextApiResponse} from "next"
import { prisma } from "../../../db";

const CreateUnit = async (req : NextApiRequest, res : NextApiResponse) => {
    const {name, classId ,handouts, videos} = req.body;
    const Unit = await prisma.unit.create({
        data: {
            name,
            class: {connect: {id: classId}},
            handouts,
            videos,
        }
    })
    res.json(Unit);
}

export default CreateUnit;

/*{
	"name" : "New Unit ClassId 2",
	"classId" : 2,
	"handouts" : {
		
	},
	"videos" : {}
}*/