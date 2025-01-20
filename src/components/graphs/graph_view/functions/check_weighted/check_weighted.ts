import { Edge } from "@xyflow/react";
import { NO_WEIGHT } from "../../../../../shared/constants";


// should return true if graph is weighted
export default function check_weighted(edges : Edge[]) : boolean {
    return edges.every((e : Edge) => e.label !== NO_WEIGHT && e.label !== undefined);
}