/* eslint-disable @typescript-eslint/no-unused-vars */
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, Node, OnNodesChange, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import './App.css'
import { useCallback, useState } from 'react';
import LLMNode from './customNodes/LLMNode';
import ColorNode from './customNodes/ColorNode';
import ScrapeNode from './customNodes/ScrapeNode';
import WebSearchNode from './customNodes/WebSearchNode';

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const nodeTypes = {
  colorNode : ColorNode,
  LLMNode,
  ScrapeNode,
  WebSearchNode,
};
 
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export default function App() {

  const [bg, setBg] = useState("#FFFFFF")

  function onChangeColor(event : React.ChangeEvent<HTMLInputElement>){
    event.preventDefault()
    setBg(event.target.value)
  }

  const initialNodes = [
    { id: '1', type : 'input', position: { x: 0, y: 0 }, data: { label: 'Input' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    { id: '3', type :'colorNode', position: { x: 0, y: 400 }, data: { label: '4', onChange : onChangeColor } },
    { id: '4', type :'LLMNode', position: { x: 0, y: 500 }, data: { label: '5', onChange : () => void 0 } },
      
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

  // const reactFlow = useReactFlow()

  function handleAddNode(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void {
    event.preventDefault()
    // reactFlow.addNodes({id:'5', position : {x:0, y:200}, data : {label : '3'}})
    setNodes(prevNodes => 
      [...prevNodes, {id:'3', position : {x:0, y:200}, data : {label : '3'}}]
    )
  }
  
  const onConnect = useCallback(
    (connection : Connection) =>
      setEdges(eds =>
        addEdge<Edge>(connection, eds),
      ),
    [setEdges],
  );

  function handleListNodes(event: React.MouseEvent<HTMLSpanElement>): void {
    nodes.forEach(node => console.log(JSON.stringify(node)))
  }

  return (
    <div style={{display:'flex', width: '100vw', height: '100vh'}}>
      <div className='flex shrink grow-0 w-[80%]'>
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
          <Controls/>
        </ReactFlow>
      </div>
      <div className='flex shrink-0 grow-0 flex-col w-[20%] h-full bg-[#EFEFEF]'>
        <span onClick={handleAddNode}>add node</span>
        <span onClick={handleListNodes}>list nodes</span>
      </div>
    </div>
  );
}