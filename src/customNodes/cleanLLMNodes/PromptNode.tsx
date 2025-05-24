/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, NodeProps, Position, Node, useReactFlow } from "@xyflow/react";
import { useEffect, useRef } from "react";

const defaultPromptValue = 'Here should go your prompt...'

export default function PromptNode({id, data} : NodeProps<PromptNodeType>){

    const { getNode, updateNodeData } = useReactFlow<PromptNodeType>()

    const textareaRef = useRef<HTMLTextAreaElement|null>(null)

    function process(){
        if(textareaRef.current == null || textareaRef.current.value == null) return
        const node = getNode(id)
        if(!node) return
        updateNodeData(id, { prompt : textareaRef.current.value })
    }

    /*useEffect(() => {
        // define the process fn within node datas
        const node = getNode(id)
        if(!node) return
        updateNode(id, { data : { ...node.data, processFn : process } })
    }, [textareaRef.current])*/

    return(
        <div className="node p-[10px] w-[340px] h-fit gap-y-[0.75rem]">
            <label onClick={process}>{data.label ?? 'Prompt'}</label>
            <textarea ref={textareaRef} placeholder={defaultPromptValue} rows={8} defaultValue="" className="resize-none border-1 border-neutral-200 p-[5px] rounded-sm bg-neutral-50 text-[10px] w-full focus:outline-none focus:border-blue-400"/>
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => void 0}
                isConnectable={true}
            />
        </div>
    )
}

export type PromptNodeType = Node<{label : string, prompt : string, processFn : () => void}>