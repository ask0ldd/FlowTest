import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Compute from "../pages/Compute";
import Spita from "../pages/Spita";
import ComputeLLM from "../pages/ComputeLLM";
import ComputeLLM2 from "../pages/ComputeLLM2";
import ControlledFlowComputation from "../pages/ControlledFlowComputation";
import TestDifferedFlow from "../pages/TestDifferedFlow";

function CustomRouter() {

    return (
        <BrowserRouter>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/control" element={<ControlledFlowComputation />} />
                  <Route path="/diff" element={<TestDifferedFlow />} />
                  <Route path="/compute" element={<Compute/>} />
                  <Route path="/llm2" element={<ComputeLLM2/>} />
                  <Route path="/llm" element={<ComputeLLM/>} />
                  <Route path="/spita" element={<Spita/>} />
                  <Route path="*" element={<App />} />
                </Routes>
        </BrowserRouter>
      );
  }
  
  export default CustomRouter