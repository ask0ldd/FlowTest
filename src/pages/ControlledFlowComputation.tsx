/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactFlow, Background, BackgroundVariant, Controls, addEdge, Connection, Edge, useEdgesState, useNodesState, Node } from "@xyflow/react";
import { useCallback } from "react";
import OllamaNode from "../customNodes/cleanLLMNodes/OllamaNode";
import PreviewNode from "../customNodes/cleanLLMNodes/PreviewNode";
import PromptNode from "../customNodes/cleanLLMNodes/PromptNode";
import ModelNode from "../customNodes/cleanLLMNodes/ModelNode";

const initNodes = [
    { id: '1', type: 'promptNode', position: { x: 0, y: 100 }, data: { label : 'Prompt 1'} },
    { id: '2', type: 'promptNode', position: { x: 0, y: -100 }, data: { label : 'System Prompt 2'} },
    { id: '3', type: 'ollamaNode', position: { x: 400, y: 0 }, data: { label: 'Ollama 3' } },
    { id: '4', type: 'previewNode', position: { x: 600, y: 0 }, data: { label: 'Preview 4' } },
    { id: '5', type: 'modelNode', position: { x: 0, y: 300 }, data: { label: 'Model 5' } },
]

const initEdges = [
    { id: '1-3', source: '1', target: '3', targetHandle: 'prompt' /*type : 'step'*/ },
    { id: '5-3', source: '5', target: '3', targetHandle: 'model' },
    { id: '2-3', source: '2', target: '3', targetHandle: 'systemPrompt' },
    { id: '3-4', source: '3', target: '4', targetHandle: 'input' },
];

export default function ControlledFlowComputation(){
    
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initEdges);

    const onConnect = useCallback(
        (connection : Connection) =>
            setEdges(eds =>
                addEdge<Edge>(connection, eds),
            ),
        [setEdges],
    );

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
                    defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
                    fitView
                    attributionPosition="bottom-left"
                    style={{background:"#FFFFFF"}}
                >
                    <Background color="#333" variant={BackgroundVariant.Dots} />
                    <Controls/>
                </ReactFlow>
            </div>
            <div className="flex flex-col shrink grow-0 w-[20%] text-white">
                <button>Start Flow</button>
            </div>
        </div>
    )
}

const nodeTypes = {
    ollamaNode : OllamaNode,
    previewNode : PreviewNode,
    promptNode : PromptNode,
    modelNode : ModelNode,
}