/* eslint-disable @typescript-eslint/no-unused-vars */
import { addEdge, Background, BackgroundVariant, Connection, Edge, Node, OnNodesChange, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import './App.css'
import { useCallback, useState } from 'react';
import ColorNode from './customNodes/colorNode';
import LLMNode from './customNodes/LLMNode';

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const nodeTypes = {
  colorNode: ColorNode,
  LLMNode : LLMNode,
};
 
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export default function App() {

  const [bg, setBg] = useState("#FFFFFF")

  function onChangeColor(event : React.ChangeEvent<HTMLInputElement>){
    event.preventDefault()
    setBg(event.target.value)
  }

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    { id: '4', type :'colorNode', position: { x: 0, y: 400 }, data: { label: '4', onChange : onChangeColor } },
    { id: '5', type :'LLMNode', position: { x: 0, y: 500 }, data: { label: '5', onChange : () => void 0 } },
      
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

  function handleAddNode(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void {
    event.preventDefault()
    setNodes(prevNodes => [...prevNodes, {id:'3', position : {x:0, y:200}, data : {label : '3'}}])
  }
  
  const onConnect = useCallback(
    (params : Connection) =>
      setEdges(eds =>
        addEdge<Edge>({ ...params }, eds),
      ),
    [],
  );

  return (
    <div style={{display:'flex', width: '100vw', height: '100vh'}}>
      <div style={{ width: '80%', height: '100%' }}>
        <ReactFlow 
          nodes={nodes} 
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          snapToGrid={true}
          defaultViewport={defaultViewport}
          fitView
          attributionPosition="bottom-left"
          style={{background:bg}}
        >
          <Background color="#333" variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
      <div style={{display:'flex', flexDirection:'column', width:'20%', height:'100%', background:'#EFEFEF'}}>
        <span onClick={handleAddNode}>add node</span>
      </div>
    </div>
  );
}