import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"


export const Room  = () =>{
    const [searchParams , setSearchParms] = useSearchParams()
    const name = searchParams.get("name");



    // Logic to Let user init to the room 
    useEffect(()=>{



    }, [name])
  

    
    return <div>
        hii  {name}
    </div>
}