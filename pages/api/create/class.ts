import {NextApiRequest, NextApiResponse} from "next"
import { prisma } from "../../../db";
import { getSession } from "next-auth/react";

const CreateClass = async (req : NextApiRequest, res : NextApiResponse) => {
    let {name, def ,image} = req.body;
    name = name.substr(name.lastIndexOf("/")+1)
    const Session = await getSession({req})
    if(Session){
        const Class = await prisma.class.create({
            data: {
                name, 
                def,
                image,
            }
        })
        res.json(Class);
    }else{
        res.json(401)
    }
}

export default CreateClass;

/*{
	"name" : "New Name",
	"def" : "New Def",
	"image" : "/chemistry_logo.jpg"
}*/