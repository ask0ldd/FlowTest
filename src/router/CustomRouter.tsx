import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Compute from "../pages/Compute";
import Spita from "../pages/Spita";
import ComputeLLM from "../pages/ComputeLLM";

function CustomRouter() {

    return (
        <BrowserRouter>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/compute" element={<Compute/>} />
                  <Route path="/llm" element={<ComputeLLM/>} />
                  <Route path="/spita" element={<Spita/>} />
                  <Route path="*" element={<App />} />
                </Routes>
        </BrowserRouter>
      );
  }
  
  export default CustomRouter