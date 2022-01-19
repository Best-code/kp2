import { prisma } from "../../../db";

const GetVideos = async (req : any, res : any) => {
    const {unitId} = req.query
    if(unitId){
        const GetVideos = await prisma.video.findMany({
            where : {
                unitId: Number(unitId)
            }
        });
        res.json(GetVideos);
    }else{
        res.status(500)
    }
}

export default GetVideos