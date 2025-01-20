import { Edge } from "@xyflow/react";
import reset_edge_color from "../../../util/reset_edge_color";
import { ARROW_SVG_ID, NO_ARROW, NO_WEIGHT, NODE_MAX } from "../../../../../shared/constants";
import getRandomInt from "../../../../utility/functions/random_int";
import { ActionType } from "../../../../../shared/enumerations/enums";
import { GraphAction } from "../../../../../shared/types/graph_map_types";


function handle_directed(edges: Edge[], isWeighted: boolean, nodeId: string, first: string, dispatch: React.Dispatch<GraphAction>): Edge[] | null | number {
    if (first === "-1") {
        dispatch({ type: ActionType.SET_PAIR, payload: first });
        return null;
    }
    const scnd: string = nodeId;
    const id: string = `${first}-${scnd}`;
    const prevent_two_arrows_id: string = `${scnd}-${first}`;

    // check if there is same id ///// parseInt(scnd) highly experimental
    if (edges.some((e: Edge) => e.id === id) || first === scnd) {
        return null;
    }

    const new_label: string = isWeighted ? String(getRandomInt(NODE_MAX)) : NO_WEIGHT;

    if (edges.some((e: Edge) => e.id === prevent_two_arrows_id)) {
        return [...reset_edge_color(edges.filter((e: Edge) => e.id !== prevent_two_arrows_id)), {
            id: id, source: first, target: scnd, type: 'straight', label: new_label,
            style: { stroke: "black" }, markerEnd: ARROW_SVG_ID
        }];
    }
    else {
        return [...reset_edge_color(edges), {
            id: id, source: first, target: scnd, type: 'straight', label: new_label,
            style: { stroke: "black" }, markerEnd: ARROW_SVG_ID
        }];
    }
}


function handle_undirected(edges: Edge[], nodeId: string, first: number, isWeighted: boolean, dispatch: React.Dispatch<GraphAction>): Edge[] | null | number {
    let scnd: number = parseInt(nodeId);

    if (first > scnd) {
        const tmp: number = first;
        first = scnd;
        scnd = tmp;
    }
    // this is for removing double edges
    const id = `${first}-${scnd}`;

    // if first is not set, set it as next will make connection
    if (first === -1) {
        dispatch({ type: ActionType.SET_PAIR, payload: first });
        return null;
    }
    // handle same id's, if there is connection then second will be dispatched
    // as next to connect
    if (edges.some((e: Edge) => e.id === id) || first === scnd) {
        return null;
    }

    const new_label: string = isWeighted ? String(getRandomInt(NODE_MAX)) : NO_WEIGHT;

    return [...reset_edge_color(edges), {
        id: id, source: String(first), target: String(scnd), type: 'straight', label: new_label,
        style: { stroke: "black" }, markerEnd: NO_ARROW
    }];
}


export default function handle_connection(isDirected: boolean, first: number, nodeId: string, dispatch: React.Dispatch<GraphAction>,
    isWeighted: boolean, edges: Edge[]): Edge[] | null | number {

    return isDirected ?
        handle_directed(edges, isWeighted, nodeId, String(first), dispatch)
        :
        handle_undirected(edges, nodeId, first, isWeighted, dispatch);
}