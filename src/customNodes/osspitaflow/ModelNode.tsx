/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, Position } from "@xyflow/react";
import { OllamaService } from "../../services/OllamaService";
import { useEffect, useState } from "react";
import { IModelInfos } from "../../interfaces/responses/OllamaResponseTypes";
// import * as Select from '@radix-ui/react-select'
import './ModelNode.css'

export default function ModelNode(){

    const [models, setModels] = useState<IModelInfos[]>([])
    const [value, setValue] = useState('')
    const [index, setIndex] = useState(0)

    async function getModels(){
        const models = (await OllamaService.getModelList())?.models
        setModels(models ?? [])
        if(models) setValue(models[0].model)
    }

    useEffect(() => {
        getModels()
    }, [])

    function handlePrevModel(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        setIndex(prevIndex => index == 0 ? models.length - 1 : index - 1)
    }

    function handleNextModel(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        setIndex(prevIndex => index == models.length - 1 ? 0 : index + 1)
    }

    return(
        <div className="node w-[340px]">
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
            />
            <div className="p-[1rem]" style={{display:'flex', flexDirection:'column', rowGap:'1rem'}}>
                <span>Model</span>
                <div className="flex">
                    <button className="flex justify-center h-[40px] w-[40px] items-center" onClick={handlePrevModel}>p</button>
                        <span className="flex justify-center h-[40px] w-full items-center px-[10px]">{models[index]?.model ?? 'empty'}</span>
                    <button className="flex justify-center h-[40px] w-[40px] items-center" onClick={handleNextModel}>n</button>
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