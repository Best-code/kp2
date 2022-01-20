import {NextApiRequest, NextApiResponse} from "next"
import { prisma } from "../../../db";

const CreateClass = async (req : NextApiRequest, res : NextApiResponse) => {
    const {name, def ,image} = req.body;
    const Class = await prisma.class.create({
        data: {
            name, 
            def,
            image,
        }
    })
    res.json(Class);
}

export default CreateClass;

/*{
	"name" : "New Name",
	"def" : "New Def",
	"image" : "/chemistry_logo.jpg"
}*/