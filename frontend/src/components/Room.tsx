import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { io, Socket } from "socket.io-client";

const  URL = "http://localhost:3000"
export const Room  = () =>{
    const [searchParams , setSearchParms] = useSearchParams()
    const name = searchParams.get("name");
    const [socket,setSocket ] = useState<null | Socket>(null);
    const [lobby, setLobby] = useState(true)




    // Logic to Let user init to the room 
    useEffect(()=>{
        const socket =io(URL);
          socket.on("send-offer", ({roomId})=>{
            alert("send offer please")
            setLobby(false)
            socket.emit("offer", {
                sdp:"",
                roomId
            })
          })
          socket.on("offer", ({roomId, offer})=>{
            alert('send answer please ');
            setLobby(false)
            // socket.emit("answer",{
            //     roomId,
            //     sdp:""

            // })

          })
          socket.on("answer", ({roomId, answer})=>{
            setLobby(false)
            alert('Conenction Done  ');

          })

          socket.on("loby", () =>{
            setLobby(true)
          })

          setSocket(socket)
          
    }, [name])


    if(lobby) return <div>waitin to connect someone {lobby}</div>
  

    
    return <div>
        hii  {name}
        <video width={400} height={400 }></video>
        <video width={400} height={400 }></video>
    </div>
}