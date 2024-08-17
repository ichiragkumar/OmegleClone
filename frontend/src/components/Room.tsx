import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { io, Socket } from "socket.io-client";

const  URL = "http://localhost:3000"
export const Room  = () =>{
    const [searchParams , setSearchParms] = useSearchParams()
    const name = searchParams.get("name");
    const [socket,setSocket ] = useState<null | Socket>(null);




    // Logic to Let user init to the room 
    useEffect(()=>{
        const socket =io(URL);
          socket.on("send-offer", ({roomId})=>{
            alert("send offer please")
            socket.emit("offer", {
                sdp:"",
                roomId
            })
          })
          socket.on("offer", ({roomId, offer})=>{
            alert('send answer please ');
            socket.emit("answer",{
                roomId,
                sdp:""

            })

          })
          socket.on("answer", ({roomId, answer})=>{
            alert('Conenction Done  ');

          })
          
    }, [name])

  

    
    return <div>
        hii  {name}
    </div>
}