import styled from "styled-components"
import { useState } from "react"

function BookForm(){

    const defaultFormValues = {title: "", author: "", summary:"", cover_url: "", "fiction?":true }
    const [formValues, setFormValues] = useState(defaultFormValues)

    function updateFormValues(e){
        console.log(e.target.name)
        const key = e.target.name
        const value = e.target.value
        setFormValues(...formValues, formValues[key] = value)
    }

    return (
        <StyledForm>
            <label>
                Title:
                <input type="text" name="title" value = {formValues['title']} onChange={updateFormValues}/>
            </label>
            <label>
                Author:
                <input type="text" name="author" value = {formValues['author']} onChange={updateFormValues}/>
            </label>

            <div onChange={updateFormValues} >
            <label>
                Fiction
                <input type="radio" name="fiction?" value = {true} checked = {true}/>
            </label>
            <label>
                Nonfiction
                <input type="radio" name="fiction?" value = {false} />
            </label>

            </div>
            
            <label>
                Summary:
                <textarea rows="10" cols="50" name="summary" value = {formValues['summary']} onChange={updateFormValues}/>
            </label>
            <label>
                Book Cover URL:
                <input type="text" name="cover_url" value = {formValues['cover_url']} onChange={updateFormValues}/>
            </label>
            <label>
                <input type="submit" name="cover_url"/>
            </label>
        </StyledForm>
    )
}

export default BookForm

const StyledForm = styled.form`
width: 200px;
`