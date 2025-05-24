/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, NodeProps, Position, Node, useReactFlow } from "@xyflow/react";
import OllamaMockService from "../../services/OllamaMockService";
import { PromptNodeType } from "./PromptNode";
import { ModelNodeType } from "./ModelNode";
import { useCallback, useEffect } from "react";
import useParentNodeData from "../../hooks/useParentNodeData";

export default function OllamaNode({id, data} : NodeProps<OllamaNodeType>){

    const { updateNode, getNode } = useReactFlow<OllamaNodeType>()

    const process = useCallback(({ model, systemPrompt, prompt }: { model: string; systemPrompt: string; prompt: string }) => 
        {
            const generation = OllamaMockService.generate({ model, systemPrompt, prompt })
            const node = getNode(id)
            if (!node) return
            updateNode(id, { data: { ...node.data, generation } })
        },
        [
            id, 
            getNode, 
            updateNode
        ]
    )

    // subscribe to any change to the ollama node data
    const systemPromptData = useParentNodeData<PromptNodeType>('systemPrompt')
    const promptData = useParentNodeData<PromptNodeType>('prompt')
    const modelData = useParentNodeData<ModelNodeType>('model')

    useEffect(() => {
        // !!! if flow start != true return
        console.log("test : ", promptData?.data.prompt, '/', systemPromptData?.data.prompt, '/', modelData?.data.model)
        if(!promptData?.data.prompt || !systemPromptData?.data.prompt || !modelData?.data.model) return
        console.log("pass")
        process({model : modelData.data.model, prompt : promptData.data.prompt, systemPrompt : systemPromptData.data.prompt})
    }, [
        systemPromptData, 
        promptData, 
        modelData
        /* , flow start*/
    ]) // !!! should add context testing : flow start = true

    return(
        <div className="node">
            <div className="text-left">
                <Handle
                    className="handle"
                    type="target"
                    id="systemPrompt"
                    position={Position.Left}
                    onConnect={(params) => void 0}
                    isConnectable={true}
                />
                <label className="label">Sys Prompt</label>
            </div>
            <div className="text-left">
                <Handle
                    className="handle"
                    type="target"
                    id="prompt"
                    position={Position.Left}
                    onConnect={(params) => void 0}
                    isConnectable={true}
                />
                <label className="label">Prompt</label>
            </div>
            <span className="w-full text-center">{data.label ?? 'Start'}</span>
            <div>100%</div>
            <div className="text-left">
                <Handle
                    className="handle"
                    type="target"
                    id="model"
                    position={Position.Left}
                    onConnect={(params) => void 0}
                    isConnectable={true}
                />
                <label className="label">Model</label>
            </div>
            <div className="text-left">
                <Handle
                    className="handle"
                    type="target"
                    id="options"
                    position={Position.Left}
                    onConnect={(params) => void 0}
                    isConnectable={true}
                />
                <label className="label">Options</label>
            </div>
            <div>
                <Handle
                    type="source"
                    id="generation"
                    position={Position.Right}
                    onConnect={(params) => void 0}
                    isConnectable={true}
                />
            </div>
        </div>
    )
}

export type OllamaNodeType = Node<{label : string, systemPrompt : string, prompt : string, context : string, model : string, generation : string}, 'ollama'>;