import UnitComponent from "../../../components/unit";
import { getSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Unit } from "@prisma/client";
import { GetServerSideProps } from "next";
import IsAdmin from "../../../helpers/IsAdmin";
import { serverRoute } from "../../../config";

const Class = ({ classInfo, units, isAdmin }: any) => {

    const displayUnits = () => {
        if (units.length > 0) {
            return <div className="flex-col flex justify-center items-center">
                <h1 className="text-4xl font-bold flex items-center justify-center pb-4">
                    Units
                </h1>
                <div className="w-4/5 md:w-2/3 bg-indigo-200 p-2 max-h-[26rem] md:max-h-[32rem] lg:max-h-[34rem]">
                    <div className="grid md:grid-cols-2 md:gap-3 gap-2 max-h-[25rem] md:max-h-[30rem] lg:max-h-[32em] overflow-scroll">
                        {units.map((unit: Unit) =>
                            <UnitComponent class={classInfo} key={unit.id} name={unit.name} isAdmin={isAdmin} />
                        )}
                    </div>
                </div>
            </div>
        } else {
            return <div className="flex justify-center items-center ">
                <div className="flex h-1/2 font-bold text-4xl">
                    <div>
                        Nothing To See Here
                    </div>
                </div>
            </div>
        }
    }

    const addUnitButton = () => {
        return (
            <div className="grid place-content-center ">
                <a href={`/class/${classInfo.name}/createUnit`}>
                    <FontAwesomeIcon className="w-24 h-24" icon={faPlusCircle} />
                </a>
            </div>
        )
    }

    return <div>
        <h1 className="text-center text-6xl text-indigo-700 font-bold py-6">
            Welcome to {classInfo.name}
        </h1>
        <div>
            {displayUnits()}
            <div className="mt-6">
                {isAdmin && addUnitButton()}
            </div>
        </div>
    </div>
}

export default Class;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    const { className } = context.query;
    const classInfoRes = await fetch(`${serverRoute}/api/classes/class?name=${className}`)
    const classInfo = await classInfoRes.json()
    const unitsRes = await fetch(`${serverRoute}/api/classes/units/?classId=${classInfo.id}`)
    const units = await unitsRes.json()

    const isAdmin = await IsAdmin(session)

    return {
        props:
            { units, isAdmin, classInfo }
    }
}