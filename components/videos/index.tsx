interface UnitInt {
    link: String
    name: String
    key: number
}

import Link from "next/link"

export const VideoComponent = (props: UnitInt) => {
    return <div className='bg-white flex justify-center items-center w-full'>
        <Link href={`${props.link}`}>
            <div className="hover:cursor-pointer shadow-lg w-full" key={props.key}>
                <div className="p-4 text-2xl font-semibold">
                    {props.name}
                </div>
            </div>
        </Link>
    </div>
}

export default VideoComponent;