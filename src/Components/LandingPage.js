
function LandingPage ({user}) {

    return(
        <>
        {user ? <h1>WELCOME {user.name}</h1> : <h1>WELCOME LANDING PAGE</h1>}
       </>
    )

   
}

export default LandingPage