import {BsFillGearFill as GearIcon} from "react-icons/bs"
import styled from "styled-components"

function Gear ({ filled  , value }){
    
    
    return (
        <GearIcon key ={value} color={filled ? '#424bf5' : 'lightgray'} />
    )
}

export default Gear
