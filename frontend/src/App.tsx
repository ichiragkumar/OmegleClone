import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/Landing";
import { Room } from "./components/Room";


function App() {
  
  return (
    <>
      <BrowserRouter>


          <Routes>
              <Route path="/" element={<LandingPage/>}></Route>
              <Route path="/room" element={<Room/>}></Route>


          </Routes>
      </BrowserRouter>
    
    </>

  )
}

export default App
