/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, Position } from "@xyflow/react";

export default function StartNode(){
    return(
        <>
            <span className="w-[128px]">
                Start
            </span>
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => void 0}
                isConnectable={true}
            />
        </>
    )
}