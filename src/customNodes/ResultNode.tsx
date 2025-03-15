import { useNodeConnections, useNodesData, Handle, Position } from "@xyflow/react";
import { memo } from "react";
import { ResultNodeType, TextNodeType, UpperCaseNodeType, isTextNode } from "../utils/nodeUtils";

function ResultNode() {
    // This hook returns an array of connections on a specific node, handle type ('source', 'target') or handle ID.
    const connections = useNodeConnections({
      handleType: 'target',
    });
    
    // This hook lets you subscribe to changes of a specific nodes data object.
    const nodesData = useNodesData<TextNodeType | ResultNodeType | UpperCaseNodeType>(
      connections.map((connection) => connection.source),
    );

    // filter out non text nodes
    const textNodes = nodesData.filter(isTextNode);
   
    return (
      <div>
        <Handle type="target" position={Position.Left} />
        <div>
          incoming texts:{' '}
          {textNodes.map(({ data }, i) => <div key={i}>{data.text}</div>) ||
            'none'}
        </div>
      </div>
    );
  }
   
  export default memo(ResultNode);