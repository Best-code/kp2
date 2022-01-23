interface UnitInt {
    class: String | undefined | string[];
    name: String
    key: number
}

import Link from "next/link"

export const UnitComponent = (props: UnitInt) => {
    return <div className="pb-2 bg-white">
        <Link href={`/class/${props.class}/${props.name}`}>
        <div className="flex pl-4 items-center justify-left hover:cursor-pointer h-16 shadow-lg" key={props.key}>
            <div className="flex items-center justify-center text-2xl font-semibold">
                {props.name}
            </div>
        </div>
    </Link>
        </div>
}

export default UnitComponent;