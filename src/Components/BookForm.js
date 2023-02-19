import styled from "styled-components"
import { useState } from "react"

function BookForm({handleViewForm, setBooks}){

    console.log(handleViewForm)
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
        handleViewForm()
    }

    
    return (<>
        {<div>
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

            <label className="fiction">
                Fiction
                <input type="radio" name="fiction?" value = {true} defaultChecked onChange={updateFormValues}/>
            </label>

            <label className="fiction">
                Nonfiction
                <input type="radio" name="fiction?" value = {false} onChange={updateFormValues}/>
            </label>
                  
            <label>
                Summary:
                <textarea rows="8" cols="50" name="summary" value = {formValues['summary']} onChange={updateFormValues}/>
            </label>
            <label className="bookCoverLabel">
                Book Cover URL:
                <input type="text" name="cover_url" value = {formValues['cover_url']} onChange={updateFormValues}/>
            </label>
          
            <input className="submitBtn" type="submit"/>
            
        </StyledForm>
        <button onClick={handleViewForm}>CLOSE FORM</button>
        </div>}
        </>
    )
}

export default BookForm

const StyledForm = styled.form `
/* position: fixed;
top: 15vh;
left: 35vw;
border: solid;
height: 70vh;
width: 30vw;
opacity: 1;
background-color: white;

display: flex;
flex-direction: column;
align-items: center;

input.submitBtn{
    position: relative;
    bottom: 6vh;
    left: 8vw;
}

label.bookCoverLabel{
    position: relative;
    right: 8vw;
}

label.bookCoverLabel input{
    position: relative;
    bottom:2vh;
}

label{
font-size: 20px;
text-align: center;
}

label.fiction input{
    display: inline-block;
}

label input, textarea{
    display: block;
    margin: 20px;
    font-size: 15px; */
/* } */
`