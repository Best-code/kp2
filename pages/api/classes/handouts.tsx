import { prisma } from "../../../db";

const GetHandouts = async (req : any, res : any) => {
    const {unitId} = req.query
    if(unitId){
        const GetHandouts = await prisma.handout.findMany({
            where : {
                unitId: Number(unitId)
            }
        });
        res.json(GetHandouts);
    }else{
        res.status(500)
    }
}

export default GetHandouts