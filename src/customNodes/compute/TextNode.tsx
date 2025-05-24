import { NodeProps, Handle, Position, Node, useReactFlow } from "@xyflow/react";

export default function TextNode({ id, data }: NodeProps<Node<{ text: string }>>){
    const { updateNodeData, setNodes } = useReactFlow();

    function handleClose(){
        console.log("close")
        // const nodes = getNodes()
        // updateNode(id, {hidden : true})
        setNodes(nds => 
            nds.map(nd => {
                return nd.id == id ? {...nd, hidden : true} : nd 
            })
        )
    }
    
    return(
        <div>
            <div>node {id}</div>
            <div>
                <input
                onChange={(evt) => updateNodeData(id, { text: evt.target.value })}
                value={data.text}
                style={{ display: 'block' }}
                />
                <span onClick={handleClose}>x</span>
            </div>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}