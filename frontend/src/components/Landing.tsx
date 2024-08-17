import { useState } from "react"
import { Link } from "react-router-dom"
export const LandingPage = () =>{
    const [name, setName ] = useState("")
    return <div>

        <input type="text" onChange={(e)=>{
            setName(e.target.value)
        }} placeholder="Enter your Name" />

        <Link to={`/room/?name=${name}`}> Join Now
        </Link>
    </div>
}