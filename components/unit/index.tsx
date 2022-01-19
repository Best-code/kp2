interface UnitInt {
    name: String
    key: number
}

export const UnitComponent = (props: UnitInt) => {
    return <div className="shadow-lg w-2/3" key={props.key}>
        <div className="p-4 text-2xl font-semibold">
            {props.name}
        </div>
    </div>
}

export default UnitComponent;