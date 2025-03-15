import { type NodeProps, Handle, Position, type Node, useReactFlow } from "@xyflow/react";

export default function TextNode({ id, data }: NodeProps<Node<{ text: string }>>){
    const { updateNodeData } = useReactFlow();
    
    return(
        <div>
            <div>node {id}</div>
            <div>
                <input
                onChange={(evt) => updateNodeData(id, { text: evt.target.value })}
                value={data.text}
                style={{ display: 'block' }}
                />
            </div>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}