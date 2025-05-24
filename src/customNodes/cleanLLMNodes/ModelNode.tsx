/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, NodeProps, Position, Node, useReactFlow } from "@xyflow/react";
import { OllamaService } from "../../services/OllamaService";
import { useEffect, useState } from "react";
import { IModelInfos } from "../../interfaces/responses/OllamaResponseTypes";
// import * as Select from '@radix-ui/react-select'
import './ModelNode.css'

export default function ModelNode({id, data} : NodeProps<ModelNodeType>){

    const { getNode, updateNodeData } = useReactFlow<ModelNodeType>()

    const [models, setModels] = useState<IModelInfos[]>([])
    const [index, setIndex] = useState(0)

    async function getModels(){
        try{
            const models = (await OllamaService.getModelList())?.models
            setModels(models ?? [])
            const node = getNode(id)
            if(!models?.length) return
            updateNodeData(id, { model : models[0].model })
        }catch(e){
            console.error(e)
            setModels([])
        }
    }

    function process(){
        const node = getNode(id)
        if(!node) return
        updateNodeData(id, { model : models[index].model })
    }

    useEffect(() => {
        getModels()
    }, [])

    function handlePrevModel(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        setIndex(prevIndex => prevIndex == 0 ? models.length - 1 : prevIndex - 1)
        process()
    }

    function handleNextModel(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        setIndex(prevIndex => prevIndex == models.length - 1 ? 0 : prevIndex + 1)
        process()
    }

    return(
        <div className="node p-[10px] w-[340px] h-fit gap-y-[0.75rem]">
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
            />
            <div style={{display:'flex', flexDirection:'column', rowGap:'1rem'}}>
                <span>{data.label ?? 'Model'}</span>
                <div className="flex bg-neutral-50">
                    <button className="flex justify-center bg-neutral-900 text-white h-[30px] w-[30px] items-center" onClick={handlePrevModel}>{'<'}</button>
                        <span className="flex justify-center h-[30px] w-full items-center px-[10px]">{models[index]?.model ?? 'empty'}</span>
                    <button className="flex justify-center bg-neutral-900 text-white h-[30px] w-[30px] items-center" onClick={handleNextModel}>{'>'}</button>
                </div>
                {/*<Select.Root onValueChange={setValue} value={value}>
                    <Select.Trigger>
                        <Select.Value className="border-1 border-grey-400">
                            {value}
                        </Select.Value>
                    </Select.Trigger>
                    <Select.Content className="flex flex-col border-grey-300 border-none bg-gray-50">
                        {models && models.map((mdl, id) => (<Select.Item className="hover:bg-indigo-50 p-[10px] border-none outline-none text-[10px]" key={'model' + id} value={mdl.model}>{mdl.model}</Select.Item>))}
                    </Select.Content>
                </Select.Root>*/}
            </div>
        </div>
    )
}

export type ModelNodeType = Node<{label : string, model : string}>