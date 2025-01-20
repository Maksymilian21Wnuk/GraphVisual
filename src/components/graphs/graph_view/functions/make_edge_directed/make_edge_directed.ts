import { Edge } from "@xyflow/react";
import coin_flip from "../../../util/coin_flip";
import { ARROW_SVG_ID } from "../../../../../shared/constants";

/*
Function for making directions random,
we don't want directions to be only in form:
lower-id ---> higher-id,
let coin flip choose
*/

export default function make_edge_directed(e : Edge) : Edge {
    if (coin_flip()) {
        return {...e, markerEnd: ARROW_SVG_ID, source: e.target, target: e.source, id: `${e.target}-${e.source}`}
    }
    else{
        return { ...e, markerEnd: ARROW_SVG_ID }
    }
}