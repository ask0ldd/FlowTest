import { ReactFlow, Background, BackgroundVariant, Controls, Node, Edge } from "@xyflow/react";
import StartNode from "../customNodes/osspitaflow/StartNode";

const nodeTypes = {
    startNode : StartNode,
}

const nodes : Node[] = [
    { id: '1', type : 'startNode', position: { x: 0, y: 0 }, data: {  } },
    { id: '2', position: { x: 200, y: 0 }, data: { label: 'Prompt' } },
]

const edges : Edge[] = [
    { id : '1-2', source : '1', target : '2'}
]

export default function Spita(){
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