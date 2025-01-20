import { StructureInterface } from "../../../../../../shared/types/visualisation_types"
import infinity_parser from "../../../../../utility/functions/inf_parser";
import get_matrix_repr from "./get_matrix_repr"






export default function MatrixRepresentation({graph} : StructureInterface) {
    const matrix = get_matrix_repr(graph);

    return (
        <div>
            <ul>
                {matrix.map((x : number[], idx) => 
                    <li key={idx} className="">
                        <ul className="flex flex-row">
                            {x.map((n : number, idx) =>
                                <li key={idx} className="border p-1 w-7 h-8 hover:bg-gray-100 overflow-hidden">
                                    {infinity_parser(n)}
                                </li>
                            ) }
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    )
}