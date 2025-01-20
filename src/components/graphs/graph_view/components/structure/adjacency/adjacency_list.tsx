import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { StructureInterface } from "../../../../../../shared/types/visualisation_types";


export default function AdjacencyList({graph} : StructureInterface) {

    return (
        <div>
            <ul>
                {graph.get_nodes().map((n : string) => 
                <li key={n} className="font-bold">
                    {n + " "} 
                    <FontAwesomeIcon icon={faArrowRight} />
                    {" " + graph.get_neighbours(n).join(" ")}
                </li>
                )}
            </ul>
        </div>
    )
}