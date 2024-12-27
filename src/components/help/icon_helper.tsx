import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons/faShareNodes";
import { faHand } from "@fortawesome/free-solid-svg-icons/faHand";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faExpand } from "@fortawesome/free-solid-svg-icons/faExpand";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons/faWeightHanging";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import { fa1 } from "@fortawesome/free-solid-svg-icons/fa1";

interface IconHelper {
    icon : IconDefinition;
    description : string;
}

const helper_data : IconHelper[] = [
    {icon : faExpand, description: `Center view on graph`},
    {icon : faMinus, description: `Hide control panel`},
    {icon : faPlus, description: `Show control panel if hidden`},
    {icon : faWeightHanging, description: `Assign random weights to graph or click again to remove weights.`},
    {icon : faArrowRight, description: `Make graph directed/undirected`},
    {icon : faShareNodes, description: `Add mode for adding nodes by clicking on panel, connecting edges 
        by clicking two nodes or editing edge's weight by clicking on it`},
    {icon : faHand, description: `Drag mode for choosing, dragging nodes or changing directions of edge.`},
    {icon : faTrash, description: `Remove mode for deleting nodes or edges`},
    {icon : faX, description: `Clear current graph`},
    {icon : fa1, description:`Displays currently clicked node when connecting. -1 if not clicked any`}
];

export default function Helper() {
    return (
        <div>
            <ul>
                {helper_data.map((helper : IconHelper, key : number = 0) => 
                    <li key={key} className="py-1"><FontAwesomeIcon icon={helper.icon}/> {helper.description}</li>
                )}
            </ul>
        </div>
    )
}


