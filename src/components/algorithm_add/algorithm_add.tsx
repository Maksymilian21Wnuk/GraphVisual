import DescriptionForm from "./description_form/description_form";
import Disclaimer from "./util/disclaimer";
import CloningStep from "./cloning_step/cloning_step";
import { JsonRepresentation } from "../../algorithms/algorithms_description/json_interfaces";
import MetadataInsertStep from "./metdata_insert_step/metadata_insert_step";
import { useState } from "react";
import ImplementationStep from "./implementation_step/implementation_step";




export default function AlgorithmAdd() {
    const [templateJson, setTemplateJson] = useState<JsonRepresentation | null>(null);

    return (
        <div className="flex flex-col items-center">
            <div className="md:w-3/5">
                <Disclaimer />
                <CloningStep />
                <DescriptionForm setTemplateJson={setTemplateJson} />
                <MetadataInsertStep templateJson={templateJson} />
                <ImplementationStep />
            </div>
        </div>
    )
}