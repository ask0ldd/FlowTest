import { useNodeConnections, useNodesData, Handle, Position } from "@xyflow/react";
import { memo } from "react";
import { ResultNodeType, TextNodeType, UpperCaseNodeType, isTextNode } from "../utils/nodeUtils";

function ResultNode() {
    const connections = useNodeConnections({
      handleType: 'target',
    });
    const nodesData = useNodesData<TextNodeType | ResultNodeType | UpperCaseNodeType>(
      connections.map((connection) => connection.source),
    );
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