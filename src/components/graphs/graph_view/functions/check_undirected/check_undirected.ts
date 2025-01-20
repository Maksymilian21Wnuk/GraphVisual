import { Edge } from "@xyflow/react";
import { NO_ARROW } from "../../../../../shared/constants";


// should return true if graph is unirected
export default function check_undirected(edges : Edge[]) {
    return edges.every((e : Edge) => e.markerEnd === NO_ARROW || e.markerEnd === undefined);
}