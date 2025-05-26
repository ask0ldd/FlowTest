/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, Position } from "@xyflow/react"

const defaulTextValue = 'Insert some text...'

export default function TextBlockNode(){

    function handleTextareaFirstFocus(e : React.FocusEvent<HTMLTextAreaElement>){
        e.preventDefault()
        const txtarea = e.currentTarget as HTMLTextAreaElement
        if(txtarea.value == defaulTextValue) txtarea.value = ""
    }

    return(
        <div className="node p-[10px] w-[340px] h-fit gap-y-[0.75rem]">
            <label>Prompt</label>
            <textarea onFocus={handleTextareaFirstFocus} rows={10} defaultValue={defaulTextValue} className="resize-none border-1 border-neutral-200 p-[5px] rounded-sm bg-neutral-50 text-[10px] w-full focus:outline-none focus:border-blue-400"/>
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => void 0}
                isConnectable={true}
            />
        </div>
    )
}