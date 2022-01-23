interface UnitInt {
    name: String
    key: number
}

export const HandoutComponent = (props: UnitInt) => {
    return <div className="bg-white flex justify-center items-center w-full">
        <div className="hover:cursor-pointer shadow-lg w-full" key={props.key}>
            <div className="p-4 text-2xl font-semibold">
                {props.name}
            </div>
        </div>
    </div>
}

export default HandoutComponent;