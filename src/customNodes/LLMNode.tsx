import { Handle, NodeProps, Position, Node } from "@xyflow/react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LLMNode({id, data, isConnectable}: NodeProps<Node<{onChange : () => void}>>){
    return(
        <div style={{padding : '1rem'}}>
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div className="flex flex-col gap-y-[1rem]">
                <span>Ollama Model</span>
                <input className="flex border-1 border-neutral-400 p-2 rounded-sm focus:outline-blue-400" type="text" placeholder="llama 3.2:3b"/>
                <textarea className="flex border-1 border-neutral-400 p-2 rounded-sm focus:outline-blue-400" placeholder="prompt" rows={8} cols={50} style={{resize:'none'}}/>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                isConnectable={isConnectable}
            />
        </div>
    )
}