/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, Position } from "@xyflow/react";
import { OllamaService } from "../../services/OllamaService";
import { useEffect, useState } from "react";
import { IModelInfos } from "../../interfaces/responses/OllamaResponseTypes";
import * as Select from '@radix-ui/react-select'

export default function ModelNode(){

    const [models, setModels] = useState<IModelInfos[]>([])

    async function getModels(){
        const models = (await OllamaService.getModelList())?.models
        return setModels(models ?? [])
    }

    function handleChange(){

    }

    useEffect(() => {
        getModels()
    }, [])

    return(
        <>
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
            />
            <div className="p-[1rem]" style={{display:'flex', flexDirection:'column', rowGap:'1rem'}}>
                <span>Model</span>
                <Select.Root onValueChange={handleChange}>
                    <Select.Trigger>
                        <Select.Value placeholder="Select options" />
                    </Select.Trigger>
                    <Select.Content>
                        {models && models.map(mdl => (<Select.Item value={mdl.name}>{mdl.name}</Select.Item>))}
                    </Select.Content>
                </Select.Root>
            </div>
        </>
    )
}