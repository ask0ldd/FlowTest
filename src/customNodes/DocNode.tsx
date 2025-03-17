import { Handle, Position } from "@xyflow/react";

export default function DocNode(){
    return(
        <>
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
            />
            <div className="flex flex-col gap-y-[1rem]">
                <span>Doc Node</span>
                <input className="flex border-1 border-neutral-400 p-2 rounded-sm focus:outline-blue-400" type="text" placeholder="llama 3.2:3b"/>
                <textarea className="flex border-1 border-neutral-400 p-2 rounded-sm focus:outline-blue-400" placeholder="prompt" rows={8} cols={50} style={{resize:'none'}}/>
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