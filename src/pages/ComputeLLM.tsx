/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNodesState, useEdgesState, Edge, Node, Background, BackgroundVariant, Controls, ReactFlow, addEdge, Connection } from "@xyflow/react";
import { useCallback, useEffect, useMemo } from "react";
import ModelNode from "../customNodes/osspitaflow/ModelNode";
import FileOutputNode from "../customNodes/osspitaflow/FileOutputNode";
import OllamaNode from "../customNodes/osspitaflow/OllamaNode";
import PromptNode from "../customNodes/osspitaflow/PromptNode";
import StartNode from "../customNodes/osspitaflow/StartNode";
import { FlowService } from "../services/flowService";

export default function ComputeLLM(){
    const initNodes = useMemo(() => [
        { id: '1', type: 'startNode', position: { x: 0, y: 0 }, data: { label : 'Start 1', start : () => void 0 } },
        { id: '2', type: 'promptNode', position: { x: 0, y: 100 }, data: { label : 'Prompt 2'} },
        { id: '6', type: 'promptNode', position: { x: -400, y: 100 }, data: { label : 'Prompt 6'} },
        { id: '3', type: 'ollamaNode', position: { x: 400, y: 0 }, data: { label: 'Ollama 3' } },
        { id: '4', type: 'fileOutputNode', position: { x: 600, y: 0 }, data: { label: 'Output 4' } },
        { id: '5', type: 'modelNode', position: { x: 0, y: 300 }, data: { label: 'Model 5' } },
    ], []);
    
        const initEdges = useMemo(() => [
        { id: '1-2', source: '1', target: '3', targetHandle: 'start' /*type : 'step'*/ },
        { id: '5-3', source: '5', target: '3', targetHandle: 'model' },
        { id: '2-3', source: '2', target: '3', targetHandle: 'prompt' },
        { id: '6-2', source: '6', target: '2' },
        { id: '3-4', source: '3', target: '4', targetHandle: 'input' },
    ], []);
    
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initEdges);

    const onConnect = useCallback(
        (connection : Connection) =>
            setEdges(eds =>
            addEdge<Edge>(connection, eds),
            ),
        [setEdges],
    );

    const order = FlowService.useDFSTraversal(edges, "4")
    console.log("no incoming edges : ", JSON.stringify(FlowService.findNodesWithNoIncomingEdges(edges, nodes)))
    console.log(JSON.stringify(order))

    const nodeTypes = {
        startNode : StartNode,
        ollamaNode : OllamaNode,
        fileOutputNode : FileOutputNode,
        promptNode : PromptNode,
        modelNode : ModelNode,
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