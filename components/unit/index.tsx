interface UnitInt {
    name: String
}

export const UnitComponent = (props : UnitInt) => {
    return <div>
        <div className="bg-red-200">
            {props.name}
        </div>
    </div>
}

export default UnitComponent;