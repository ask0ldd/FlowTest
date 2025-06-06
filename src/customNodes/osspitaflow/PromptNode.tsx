/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, NodeProps, Position, Node } from "@xyflow/react";

const defaultPromptValue = 'Here should go your prompt...'

export default function PromptNode({data} : NodeProps<Node<{label : string}>>){

    function handleTextareaFirstFocus(e : React.FocusEvent<HTMLTextAreaElement>){
        e.preventDefault()
        const txtarea = e.currentTarget as HTMLTextAreaElement
        if(txtarea.value == defaultPromptValue) txtarea.value = ""
    }

    return(
        <div className="node p-[10px] w-[340px] h-fit gap-y-[0.75rem]">
            <label>{data.label ?? 'Prompt'}</label>
            <textarea onFocus={handleTextareaFirstFocus} rows={8} defaultValue={defaultPromptValue} className="resize-none border-1 border-neutral-200 p-[5px] rounded-sm bg-neutral-50 text-[10px] w-full focus:outline-none focus:border-blue-400"/>
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => void 0}
                isConnectable={true}
            />
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => void 0}
                isConnectable={true}
            />
        </div>
    )
}