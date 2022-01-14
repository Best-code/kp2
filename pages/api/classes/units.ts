import { prisma } from "../../../db";

const GetClassUnits = async (req : any, res : any) => {
    const {classId} = req.query
    if(classId){
        const GetClassUnits = await prisma.unit.findMany({
            where : {
                classId: Number(classId)
            }
        });
        res.json(GetClassUnits);
    }else{
        res.status(500)
    }
}

export default GetClassUnits