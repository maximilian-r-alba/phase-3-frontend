import {BsFillGearFill as GearIcon} from "react-icons/bs"

function Gear ({ filled  , value }){
    
    return (
        <GearIcon key ={value} color={filled ? '#424bf5' : 'lightgray'} />
    )
}

export default Gear
