import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import { useState } from 'react';
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export default function App() {

  const [nodes, setNodes] = useState(initialNodes)


  function handleAddNode(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void {
    event.preventDefault()
    setNodes(prevNodes => [...prevNodes, {id:'3', position : {x:0, y:200}, data : {label : '3'}}])
  }

  return (
    <div style={{display:'flex', width: '100vw', height: '100vh'}}>
      <div style={{ width: '80%', height: '100%' }}>
        <ReactFlow nodes={nodes} edges={initialEdges} >
          <Background color="#333" variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
      <div style={{display:'flex', flexDirection:'column', width:'20%', height:'100%', background:'#EFEFEF'}}>
        <span onClick={handleAddNode}>add node</span>
      </div>
    </div>
  );
}