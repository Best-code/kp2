import { useRouter } from "next/router";
import { Unit } from "@prisma/client";
import UnitComponent from "../../components/unit";
import { useState, useEffect } from "react"

const Class = () => {

    const [classNumber, setClassNumber] = useState<Number | undefined>();
    const [units, setUnits] = useState<Unit[]>([]);


    const router = useRouter();
    const { className } = router.query;
    useEffect(() => {
        if (className) {
            fetch(`http://localhost:3000/api/classes/class?name=${className}`)
                .then((res) => res.json())
                .then((resData) => {
                    console.log(resData)
                    setClassNumber(resData.id)
                    const units = fetch(`http://localhost:3000/api/classes/units/?classId=${resData.id}`)
                        .then((res) => res.json())
                        .then((resData) => setUnits(resData))
                })
        }
    })

    return <div>
        <div className="bg-red-900">
            {units.map((unit) => 
                <UnitComponent key={unit.id} name={unit.name} />
            )}
        </div>
    </div>
}

export default Class;