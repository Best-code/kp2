interface UnitInt {
    class: String
    name: String
    key: number
}

import Link from "next/link"

export const UnitComponent = (props: UnitInt) => {
    return <div>
        <Link href={`/class/${props.class}/${props.name}`}>
        <div className="flex hover:cursor-pointer shadow-lg" key={props.key}>
            <div className="p-4 text-2xl font-semibold">
                {props.name}
            </div>
        </div>
    </Link>
        </div>
}

export default UnitComponent;