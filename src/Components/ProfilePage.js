import {useState , useEffect} from "react";

function ProfilePage({user}){

    const [profile, setProfile] = useState({})

    useEffect(() => {
        fetch(`http://localhost:9292/users/${user.id}`)
            .then(r => r.json())
            .then(data => setProfile(data))
    }, [])    

    return(
        <h1>PROFILE PAGE HERE</h1>
    )
}