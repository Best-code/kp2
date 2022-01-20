import { useRouter } from "next/router";
import { Unit } from "@prisma/client";
import { useState, useEffect } from "react"
import UnitComponent from "../../../components/unit";

const Class = () => {

    const [classNumber, setClassNumber] = useState<Number | undefined>();
    const [units, setUnits] = useState<Unit[]>([]);


    const router = useRouter();
    const { className } = router.query;
    useEffect(() => {
        if (className && units.length == 0) {
            fetch(`/api/classes/class?name=${className}`)
                .then((res) => res.json())
                .then((resData) => {
                    setClassNumber(resData.id)
                    const units = fetch(`/api/classes/units/?classId=${resData.id}`)
                        .then((res) => res.json())
                        .then((resData) => setUnits(resData))
                })
        }
    })

    return <div>
        <h1 className="text-center text-4xl font-bold py-6">
            Welcome to {className}
        </h1>
        <div className="flex-col flex justify-center items-center">
            <h1 className="text-3xl font-semibold flex items-center justify-center">
                Units
            </h1>
            <div className="w-2/3">
                {units.map((unit) =>
                    <UnitComponent class={className} key={unit.id} name={unit.name} />
                )}
            </div>
        </div>
    </div>
}

export default Class;