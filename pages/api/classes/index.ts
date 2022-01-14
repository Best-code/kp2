import { prisma } from "../../../db";

const Classes = async (req : any, res : any) => {
    const allClasses = await prisma.class.findMany();
    res.json(allClasses);
}

export default Classes