/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, Position } from "@xyflow/react";
import { OllamaNodeType } from "./OllamaNode";
import useParentNodeData from "../../hooks/useParentNodeData";

export default function PreviewNode(){

    // subscribe to any change to the ollama node data
    const ollamaNodeData = useParentNodeData<OllamaNodeType>('input')

    return(
        <div style={{padding : '1rem'}}>
            <Handle
                type="target"
                id="input"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
            />
            <div style={{display:'flex', flexDirection:'column', rowGap:'1rem'}}>
                <span>Preview</span>
                <span>{ollamaNodeData?.data.generation ?? ''}</span>
            </div>
        </div>
    )
}

/*function useParentNodeData<T extends Node>(handleIdToParent : string){
    const parentNodeConnection = useNodeConnections({
        handleType: 'target',
        handleId: handleIdToParent
    })[0]
    const parentNode = parentNodeConnection?.source
    return useNodesData<T>(parentNode)
}*/