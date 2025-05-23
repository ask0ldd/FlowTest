/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, NodeProps, Position, Node, useReactFlow } from "@xyflow/react";

export default function StartNode({id, data} : NodeProps<StartNodeType>){

    const { updateNodeData } = useReactFlow();

    function handleStartClick(){
        updateNodeData(id, {activate : true})
    }

    return(
        <>
            <button className="w-[120px]" onClick={handleStartClick}>{data.label ?? 'Start'}</button>
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => void 0}
                isConnectable={true}
            />
        </>
    )
}

export type StartNodeType = Node<{ label: string, activate : boolean, start : () => void }, 'start'>;
