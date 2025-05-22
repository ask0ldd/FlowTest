/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, NodeProps, Position, Node } from "@xyflow/react";

export default function FileOutputNode({id, data, isConnectable}: NodeProps<Node<{toWrite : string[]}>>){
    
    // should be changed to allow only one connection

    return(
        <div style={{padding : '1rem'}}>
            <Handle
                type="target"
                id="input"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div style={{display:'flex', flexDirection:'column', rowGap:'1rem'}}>
                <span>Output File</span>
                <span>Base Name</span>
                <input className="flex border-1 border-neutral-400 p-2 rounded-sm focus:outline-blue-400" type="text" placeholder="file"/>
                <span>Extension</span>
                <input className="flex border-1 border-neutral-400 p-2 rounded-sm focus:outline-blue-400" type="text" placeholder="dat"/>
                <span>Reset & Overwrite</span>
                <span>Auto-Increment</span>
            </div>
        </div>
    )
}