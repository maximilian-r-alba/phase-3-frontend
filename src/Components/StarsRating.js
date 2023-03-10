import { useState } from "react"
import styled from "styled-components"

import Gear from "./Gear"

function StarsRating({updateFormValues=null , givenRating=0}){
   
    const [rating, setRating] = useState(givenRating)
    
    const ratingArr = [1,2,3,4,5].map((value) => 
    <label key={value} >
        {updateFormValues ? <Radio type="radio" name="rating" value={value} onChange={handleRating} ></Radio> :<></>}
        <Gear key={value} value={value} filled = {value <= rating}/>
    </label>
    )


    function handleRating (e) {
        const ratingValue = e.target.value
        setRating(ratingValue)
        updateFormValues(e)
    }
   
    return (
        <StyledLabel>
            {ratingArr}
        </StyledLabel>
    )
}

export default StarsRating

const Radio = styled.input`
opacity: 0;
pointer-events:none;
width: 1px;
margin: 0;
`
const StyledLabel = styled.label`
display: inline-flex;
width: auto;
`
