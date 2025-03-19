/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactFlow, Background, BackgroundVariant, Controls, Node, Edge, useEdgesState, useNodesState } from "@xyflow/react";
import StartNode from "../customNodes/osspitaflow/StartNode";
import OllamaNode from "../customNodes/osspitaflow/OllamaNode";
import FileOutputNode from "../customNodes/osspitaflow/FileOutputNode";
import PromptNode from "../customNodes/osspitaflow/PromptNode";

const nodeTypes = {
    startNode : StartNode,
    ollamaNode : OllamaNode,
    fileOutputNode : FileOutputNode,
    promptNode : PromptNode,
}

const initNodes : Node[] = [
    { id: '1', type : 'startNode', position: { x: 0, y: 0 }, data: { } },
    { id: '2', type : 'promptNode',  position: { x: 0, y: 100 }, data: { } },
    { id: '3', type : 'ollamaNode', position: { x: 400, y: 0 }, data: { label: 'Ollama' } },
    { id: '4', type : 'fileOutputNode', position: { x: 600, y: 0 }, data: { label: 'Output' } },
]

const initEdges : Edge[] = [
    { id : '1-2', source : '1', target : '3'}
]

export default function Spita(){
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initEdges);

    return(
        <div style={{display:'flex', width: '100vw', height: '100vh'}}>
            <div className='flex shrink grow-0 w-[80%]'>
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                snapToGrid={true}
                nodeTypes={nodeTypes}
                defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
                fitView
                attributionPosition="bottom-left"
                style={{background:"#FFFFFF"}}
            >
                <Background color="#333" variant={BackgroundVariant.Dots} />
                <Controls/>
            </ReactFlow>
            </div>
            <div className='flex shrink-0 grow-0 flex-col w-[20%] h-full bg-[#EFEFEF]'>
              <span>log nodes</span>
              <span>log edges</span>
            </div>
        </div>
    )
}