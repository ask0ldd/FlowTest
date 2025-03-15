import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Compute from "../pages/Compute";

function CustomRouter() {

    return (
        <BrowserRouter>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/compute" element={<Compute/>} />
                  <Route path="*" element={<App />} />
                </Routes>
        </BrowserRouter>
      );
  }
  
  export default CustomRouter