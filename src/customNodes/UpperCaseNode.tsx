import { Handle, NodeProps, Position, useNodeConnections, useNodesData, useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import { isTextNode, ResultNodeType, TextNodeType, UpperCaseNodeType } from "../utils/nodeUtils";

export default function UpperCaseNode({ id }: NodeProps){
    const { updateNodeData } = useReactFlow();
    const connections = useNodeConnections({
        handleType: 'target',
    });
    const nodesData = useNodesData<TextNodeType | ResultNodeType | UpperCaseNodeType>(connections[0]?.source);
    const textNode = isTextNode(nodesData) ? nodesData : null;
    
    useEffect(() => {
            updateNodeData(id, { text: textNode?.data.text.toUpperCase() });
    }, [textNode]);

    return(
        <>
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
            />
            <div className="flex flex-col gap-y-[1rem]">
                <span>Transform to UpperCase</span>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                isConnectable={true}
            />
        </>
    )
}