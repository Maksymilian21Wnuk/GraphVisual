import { FormEvent, useState } from "react";
import reset_node_color from "../../../../util/reset_node_color";
import reset_edge_color from "../../../../util/reset_edge_color";
import storage_exists from "../functions/local_exists";
import { Node, Edge } from "@xyflow/react";
import { GraphPreset } from "../../../../../../shared/types/graph_map_types";


interface GraphSaveInterface {
    nodes : Node[];
    edges : Edge[]
    graphPresets : GraphPreset[];
    setGraphPresets : React.Dispatch<React.SetStateAction<GraphPreset[]>>
}


export default function GraphSave({nodes, edges, graphPresets, setGraphPresets} : GraphSaveInterface) {

    const [graphName, setGraphName] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (graphName === "") {
            alert("Graph name must not be empty")
        }
        else {
            alert(`Graph saved as ${graphName}`);
            const nodes_to_save = reset_node_color(nodes);
            const edges_to_save = reset_edge_color(edges);
            setGraphName("");
            // check if name exists
            if (storage_exists(graphName)) {
                setGraphPresets([...graphPresets.filter(g => g.name !== graphName), { name: graphName, nodes: nodes_to_save, edges: edges_to_save }])
            }
            else{
                setGraphPresets([...graphPresets, { name: graphName, nodes: nodes_to_save, edges: edges_to_save }])

            }
            localStorage.setItem(graphName, JSON.stringify({ nodes: nodes_to_save, edges: edges_to_save }));
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <input className="input border-2 border-black m-2"
                type="text"
                value={graphName}
                onChange={(e) => setGraphName(e.target.value)}
                placeholder="Graph name..." />
            <button className="btn bg-lime-200 hover:bg-lime-300" type="submit">Save to storage</button>
        </form>
    )
}