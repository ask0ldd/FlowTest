/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactFlow, Background, BackgroundVariant, Controls, Node, Edge, useEdgesState, useNodesState, getIncomers } from "@xyflow/react";
import StartNode from "../customNodes/osspitaflow/StartNode";
import OllamaNode from "../customNodes/osspitaflow/OllamaNode";
import FileOutputNode from "../customNodes/osspitaflow/FileOutputNode";
import PromptNode from "../customNodes/osspitaflow/PromptNode";
import ModelNode from "../customNodes/osspitaflow/ModelNode";
import { useEffect, useMemo } from "react";

const nodeTypes = {
    startNode : StartNode,
    ollamaNode : OllamaNode,
    fileOutputNode : FileOutputNode,
    promptNode : PromptNode,
    modelNode : ModelNode,
}

export default function Spita(){

    function start(){
        console.log('start')
    }

    const initNodes = useMemo(() => [
        { id: '1', type: 'startNode', position: { x: 0, y: 0 }, data: { start } },
        { id: '2', type: 'promptNode', position: { x: 0, y: 100 }, data: {} },
        { id: '3', type: 'ollamaNode', position: { x: 400, y: 0 }, data: { label: 'Ollama' } },
        { id: '4', type: 'fileOutputNode', position: { x: 600, y: 0 }, data: { label: 'Output' } },
        { id: '5', type: 'modelNode', position: { x: 0, y: 300 }, data: { label: 'Model' } },
    ], []);
    
      const initEdges = useMemo(() => [
        { id: '1-2', source: '1', target: '3', targetHandle: 'start' /*type : 'step'*/ },
        { id: '5-3', source: '5', target: '3', targetHandle: 'model' },
        { id: '2-3', source: '2', target: '3', targetHandle: 'prompt' },
        { id: '3-4', source: '3', target: '4', targetHandle: 'input' },
    ], []);
    
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initEdges);

    useEffect(() => {
        console.log(JSON.stringify(getIncomers({ id: '3', type: 'ollamaNode', position: { x: 400, y: 0 }, data: { label: 'Ollama' } }, nodes, edges)))
    }, [])

    /*useEffect(() => {
        const nds = nodes.map(nd =>  {
            if(nd.type == "startNode") {
                return {...nd, ['data'] : {...['data'], start : start} }
            } else {
                return nd
            }
        })
        setNodes(nds)
    }, [nodes])*/

    useEffect(() => {
        edges.forEach(dg => {
            if(dg.targetHandle == "model") console.log(JSON.stringify(dg))
        })
    }, [edges])

    return(
        <div style={{display:'flex', width: '100vw', height: '100vh'}}>
            <div className='flex shrink grow-0 w-[80%]'>
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                snapToGrid={true}
                nodeTypes={nodeTypes}
                fitView
                defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
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