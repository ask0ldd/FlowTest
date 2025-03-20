/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, NodeProps, Position, Node } from "@xyflow/react";

export default function StartNode({data} : NodeProps<Node<{start : () => void}>>){

    return(
        <>
            <button className="w-[120px]" onClick={data.start}>Start</button>
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => void 0}
                isConnectable={true}
            />
        </>
    )
}