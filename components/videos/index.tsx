interface UnitInt {
    link: String
    name: String
    key: number
}

import Link from "next/link"

export const VideoComponent = (props: UnitInt) => {
    return <Link href={`${props.link}`}>
        <div className="hover:cursor-pointer shadow-lg w-2/3" key={props.key}>
            <div className="p-4 text-2xl font-semibold">
                {props.name}
            </div>
        </div>
    </Link>
}

export default VideoComponent;