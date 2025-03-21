/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, NodeProps, Position, Node, useNodeConnections } from "@xyflow/react";

export default function OllamaNode({data} : NodeProps<Node<{prompt : string, context : string, model : string}>>){
    
    const connections = useNodeConnections({
        handleType: 'target',
    });

    return(
        <div className="node">
            <div className="text-left">
                <Handle
                    className="handle"
                    type="target"
                    id="ctx"
                    position={Position.Left}
                    onConnect={(params) => void 0}
                    isConnectable={true}
                />
                <label className="label">Ctx</label>
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
            <span className="w-full text-center">Ollama</span>
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