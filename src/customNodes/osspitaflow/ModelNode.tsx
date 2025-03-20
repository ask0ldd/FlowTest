/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handle, Position } from "@xyflow/react";
import { OllamaService } from "../../services/OllamaService";
import { useEffect, useState } from "react";
import { IModelInfos } from "../../interfaces/responses/OllamaResponseTypes";

export default function ModelNode(){

    const [models, setModels] = useState<IModelInfos[]>([])

    async function getModels(){
        const models = (await OllamaService.getModelList())?.models
        return setModels(models ?? [])
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
                {
                    models && models.map(mdl => (<span>{mdl.name}</span>))
                }
            </div>
        </>
    )
}