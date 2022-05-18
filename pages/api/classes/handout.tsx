import { prisma } from "../../../db";

const GetHandouts = async (req : any, res : any) => {
    const {handoutName, unitId} = req.query
    if(handoutName){
        const GetHandout = await prisma.handout.findFirst({
            where : {
                name: handoutName,
                unitId: Number(unitId)
            }
        });
        res.json(GetHandout);
    }else{
        res.status(500)
    }
}

export default GetHandouts