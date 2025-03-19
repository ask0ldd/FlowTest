/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, Position } from "@xyflow/react";

export default function StartNode(){

    function handleStart(){

    }

    return(
        <>
            <button className="w-[120px]" onClick={handleStart}>Start</button>
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => void 0}
                isConnectable={true}
            />
        </>
    )
}