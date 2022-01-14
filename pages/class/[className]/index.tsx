import { useRouter } from "next/router";
import { Unit } from "@prisma/client";
import {useState, useEffect} from "react"

const Class = () =>{

    const [classNumber, setClassNumber] = useState("");
    const [units, setUnits] = useState<Unit[]>([]);

    
    const router = useRouter();
    const {className} = router.query;
    useEffect(() => {
        const getClass = fetch(`http://localhost:3000/api/classes`)
        .then((res) => res.json())
        .then((resData) => setClassNumber(resData["id"]))

        const units = fetch(`http://localhost:3000/api/units`)
        .then((res) => res.json())
        .then((resData) => setUnits(resData))
    }, [])

    return <div>
        {units["classId"]}
    </div>
}

export default Class;