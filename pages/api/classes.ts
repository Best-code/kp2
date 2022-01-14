import { prisma } from "../../db";

const Classes = async (req : any, res : any) => {
    const allClasses = await prisma.class.findFirst();
    res.json(allClasses);
}

export default Classes