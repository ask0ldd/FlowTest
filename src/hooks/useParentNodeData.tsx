import { useNodeConnections, useNodesData, Node } from "@xyflow/react"

export default function useParentNodeData<T extends Node>(handleIdToParent : string, expectedParentType?: string) : Pick<T, "id" | "type" | "data"> | null{
    const parentNodeConnections = useNodeConnections({
        handleType: 'target',
        handleId: handleIdToParent
    })
    const parentNodeId = parentNodeConnections[0]?.source ?? null
    const parentNodeData = useNodesData<T>(parentNodeId)

    if (!parentNodeId || !parentNodeData) return null
    if (expectedParentType && parentNodeData.type !== expectedParentType) return null

    return parentNodeData
}