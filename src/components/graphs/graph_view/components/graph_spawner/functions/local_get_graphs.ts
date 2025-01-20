import { DOWNLOAD_COUNTER_NAME } from "../../../../../../shared/constants";
import { Graph, GraphPreset } from "../../../../../../shared/types/graph_map_types";



export default function storage_get_graphs() : GraphPreset[] {
    let graphs : GraphPreset[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)!;
        if (key === DOWNLOAD_COUNTER_NAME) {
            continue;
        }
        const val = JSON.parse(localStorage.getItem(key)!) as Graph;
        graphs.push({name: key, nodes: val.nodes, edges: val.edges});
    }

    return graphs;
}