import { Handle, NodeProps, Position, Node } from "@xyflow/react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ColorNode({id, data, isConnectable}: NodeProps<Node<{color:string, onChange : () => void, isConnectable : boolean}>>){
    return(
        <>
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div style={{display:'flex', flexDirection:'column', rowGap:'1rem'}}>
                <div>
                    Custom Color Picker Node: <strong>{data.color}</strong>
                </div>
                <input
                    className="nodrag"
                    type="color"
                    onChange={data.onChange}
                    defaultValue={data.color}
                />
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                isConnectable={isConnectable}
            />
        </>
    )
}