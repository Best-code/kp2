interface UnitInt {
    class: any
    name: String
    key: number
    isAdmin: boolean
}

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link"
import { useRouter } from "next/router";

export const UnitComponent = (props: UnitInt) => {

    const router = useRouter()
    const HandleDelete = () => {
        // if (check) {
        fetch(`/api/delete/unit`, {
            body: JSON.stringify({
                name: props.name,
                classId: props.class.id
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
        router.reload()
        //} else {
        //setError(true)
        // }
    }

    const DeleteUnit = () => {
        return <div className="flex justify-end items-end w-full">
            <button onClick={HandleDelete}>
                <FontAwesomeIcon className="w-8 h-8 hover:cursor-pointer hover:w-12 hover:h-12" icon={faTrashCan} />
            </button>
        </div>
    }

    return <div className="pb-2 bg-white">
        <Link href={`/class/${props.class.name}/${props.name}`}>
            <div className="flex p-4 items-center justify-left hover:cursor-pointer h-16 shadow-lg w-full" key={props.key}>
                <div className="flex items-center justify-start text-2xl font-semibold w-full">
                    {props.name}
                </div>
                <div className="flex justify-end items-center">
                    {props.isAdmin && DeleteUnit()}
                </div>
            </div>
        </Link>
    </div>
}

export default UnitComponent;