interface UnitInt {
    name: String
    key: number
}

export const UnitComponent = (props : UnitInt) => {
    return <div>
        <div className="bg-red-200" key={props.key}>
            {props.name}
        </div>
    </div>
}

export default UnitComponent;