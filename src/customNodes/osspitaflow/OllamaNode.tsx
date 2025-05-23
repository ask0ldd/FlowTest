/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, NodeProps, Position, Node, useNodeConnections, useNodesData } from "@xyflow/react";
import { useEffect } from "react";
import { StartNodeType } from "./StartNode";
import OllamaMockService from "../../services/OllamaMockService";

export default function OllamaNode({data} : NodeProps<Node<{label : string, prompt : string, context : string, model : string}>>){

    /*const startConnection = useNodeConnections({
        handleType: 'target',
    });

    console.log(JSON.stringify(startConnection))

    const startNode = startConnection[0]?.source
    const startNodesData = useNodesData<StartNodeType>(startNode)

    useEffect(() => {
        console.log(startNodesData?.data.activate)
    }, [startNodesData?.data.activate])*/

    function process({ model, systemPrompt = 'You are a helpful assistant.', prompt } : {model : string, systemPrompt : string, prompt : string}){
        OllamaMockService.generate({model, systemPrompt, prompt})
    }

    function handleStartClick(){

    }

    return(
        <div className="node" onClick={handleStartClick}>
            <div className="text-left">
                <Handle
                    className="handle"
                    type="target"
                    id="system"
                    position={Position.Left}
                    onConnect={(params) => void 0}
                    isConnectable={true}
                />
                <label className="label text-[14px]">Sys Prompt</label>
            </div>
            <div className="text-left">
                <Handle
                    className="handle"
                    type="target"
                    id="start"
                    position={Position.Left}
                    onConnect={(params) => void 0}
                    isConnectable={true}
                />
                <label className="label">Start</label>
            </div>
            <div className="text-left">
                <Handle
                    className="handle"
                    type="target"
                    id="prompt"
                    position={Position.Left}
                    onConnect={(params) => void 0}
                    isConnectable={true}
                />
                <label className="label">Prompt</label>
            </div>
            <span className="w-full text-center">{data.label ?? 'Start'}</span>
            <div>100%</div>
            <div className="text-left">
                <Handle
                    className="handle"
                    type="target"
                    id="model"
                    position={Position.Left}
                    onConnect={(params) => void 0}
                    isConnectable={true}
                />
                <label className="label">Model</label>
            </div>
            <div className="text-left">
                <Handle
                    className="handle"
                    type="target"
                    id="options"
                    position={Position.Left}
                    onConnect={(params) => void 0}
                    isConnectable={true}
                />
                <label className="label">Options</label>
            </div>
            <div>
                <Handle
                    type="source"
                    position={Position.Right}
                    onConnect={(params) => void 0}
                    isConnectable={true}
                />
            </div>
        </div>
    )
}