/* eslint-disable @typescript-eslint/no-unused-vars */
import { Background, BackgroundVariant, Controls, Node, Edge, ReactFlow, useEdgesState, useNodesState, addEdge, Connection } from "@xyflow/react";
import { useCallback } from "react";
import TextNode from "../customNodes/TextNode";
import UpperCaseNode from "../customNodes/UpperCaseNode";
import ResultNode from "../customNodes/ResultNode";
import { MyNodeType } from "../utils/nodeUtils";

const initNodes: MyNodeType[] = [
    {
      id: 'n1',
      type: 'text',
      data: {
        text: 'hello',
      },
      position: { x: -100, y: -50 },
    },
    {
      id: 'n2',
      type: 'text',
      data: {
        text: 'world',
      },
      position: { x: 0, y: 100 },
    },
    {
      id: 'n3',
      type: 'uppercase',
      data: { text: '' },
      position: { x: 100, y: -100 },
    },
    {
      id: 'n4',
      type: 'result',
      data: { text : ''},
      position: { x: 300, y: -75 },
    },
];

const initEdges : Edge[] = [
    {
        id : 'e1-3',
        source : 'n1',
        target : 'n3',
    },
    {
        id : 'e2-4',
        source : 'n2',
        target : 'n4',
    },
    {
        id : 'e3-4',
        source : 'n3',
        target : 'n4',
    },
]

export default function Compute(){

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initEdges);

    const onConnect = useCallback(
    (connection : Connection) =>
        setEdges(eds =>
        addEdge<Edge>(connection, eds),
        ),
    [setEdges],
    );

    const nodeTypes = {
        text : TextNode,
        uppercase : UpperCaseNode,
        result : ResultNode,
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
            </div>
        </div>
    );
    
}