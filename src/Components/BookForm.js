import styled from "styled-components"
import { useState } from "react"

function BookForm({books, setBooks}){

    const defaultFormValues = {title: "", author: "", summary:"", cover_url: "", subgenre: "", "fiction?":true }
    const [formValues, setFormValues] = useState(defaultFormValues)

    function updateFormValues(e){
 
        const key = e.target.name
        const value = e.target.value    
        setFormValues({...formValues, [key]: value})
    
    }

    function submitBook(e){
        e.preventDefault()
        fetch("http://localhost:9292/books",{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(formValues)
        })
        .then(r=>r.json())
        .then(data=>setBooks(books => [...books, data]))
    }

    console.log(books)
    
    return (
        <StyledForm onSubmit={submitBook}>
            <label>
                Title:
                <input type="text" name="title" value = {formValues['title']} onChange={updateFormValues}/>
            </label>
            <label>
                Author:
                <input type="text" name="author" value = {formValues['author']} onChange={updateFormValues}/>
            </label>
            <label>
                Genre:
                <input type="text" name="subgenre" value = {formValues['subgenre']} onChange={updateFormValues}/>
            </label>

            <label>
                Fiction
                <input type="radio" name="fiction?" value = {true} defaultChecked onChange={updateFormValues}/>
            </label>
            <label>
                Nonfiction
                <input type="radio" name="fiction?" value = {false} onChange={updateFormValues}/>
            </label>
            
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