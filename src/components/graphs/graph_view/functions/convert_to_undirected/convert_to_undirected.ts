import { Edge } from "@xyflow/react";
import { NO_ARROW } from "../../../../../shared/constants";

/*
    this is used for conversion
    from directed to undirected,
    we want to hold the invariant
    of undirected graph having 
    as source lower (as number) id
*/


export default function convert_to_undirected(edges : Edge[]) : Edge[]{
    return edges.map((e : Edge) => {
        // holds invariant, just remove svg
        if (parseInt(e.source) < parseInt(e.target)) {
            return {
                ...e,
                markerEnd: NO_ARROW
            };
        }   
        // doesnt hold invariant, need to parse new 
        // edge definition
        else {
            return {
                ...e, 
                id : e.target + "-" + e.source, 
                markerEnd: NO_ARROW,
                source: e.target,
                target: e.source
            }
        }
    });

}