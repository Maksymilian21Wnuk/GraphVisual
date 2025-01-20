import { useState } from "react";
import DirectedGraph from "../../../../../../shared/models/directed_graph/directed_graph";
import AdjacencyList from "../adjacency/adjacency_list";
import CodeRepresentation from "../code/code";
import MatrixRepresentation from "../matrix/matrix";
import StructureTab from "./structure_tab";
import { RepresentationState } from "../../../../../../shared/enumerations/enums";



interface RepresentationInterface {
    graph: DirectedGraph;
}


export default function Representation({ graph }: RepresentationInterface) {
    const [selectedVal, setSelectedVal] = useState(RepresentationState.Adjacency);

    return (
        <div className="h-full overflow-auto text-sm lg:text-lg">
            <StructureTab selectedVal={selectedVal} setSelectedVal={setSelectedVal} />
            <div className={selectedVal === RepresentationState.Adjacency ? "overflow-auto h-[200px] lg:h-[350px]" : "hidden"}>
                <AdjacencyList graph={graph} />
            </div>
            <div className={selectedVal === RepresentationState.Matrix ? "overflow-auto h-[200px] lg:h-[350px]" : "hidden"}>
                <MatrixRepresentation graph={graph} />
            </div>
            <div className={selectedVal === RepresentationState.Code ? "overflow-auto h-[200px] lg:h-[350px]" : "hidden"}>
                <CodeRepresentation graph={graph} />
            </div>
        </div>
    )
}