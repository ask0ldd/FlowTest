import { Handle, Position } from "@xyflow/react";

export default function WebSearchNode(){
    return(
        <>
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
            />
            <div className="flex flex-col gap-y-[1rem]">
                <span>Web Search</span>
                <input className="flex border-1 border-neutral-400 p-2 rounded-sm focus:outline-blue-400" type="text" placeholder="google"/>
                <textarea className="flex border-1 border-neutral-400 p-2 rounded-sm focus:outline-blue-400" placeholder="web search query" rows={8} cols={50} style={{resize:'none'}}/>
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