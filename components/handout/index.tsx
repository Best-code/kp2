interface UnitInt {
    name: String
    key: Number
}

export const HandoutComponent = (props: UnitInt) => {
    return <div className="hover:cursor-pointer shadow-lg w-2/3" key={props.key}>
            <div className="p-4 text-2xl font-semibold">
                {props.name}
            </div>
        </div>
}

export default HandoutComponent;