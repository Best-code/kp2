import { prisma } from "../../../db";

const Units = async (req : any, res : any) => {
    const allUnits = await prisma.unit.findMany();
    res.json(allUnits);
}

export default Units