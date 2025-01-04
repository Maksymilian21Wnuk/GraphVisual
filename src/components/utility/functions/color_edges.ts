import { Edge } from "@xyflow/react";
import { Step } from "../../../shared/types/visualisation_types";
import { EdgeColor } from "../../../shared/enumerations/enums";
import { ARROW_SVG_ID, INVISIBLE_ARROW, NO_ARROW } from "../../../shared/constants";
import reset_edge_color from "../../graphs/util/reset_edge_color";


// changes to given color
// this should not color to current when it is visited!
function change_given_id(edges: Edge[], id: string, should_color_visited_edge: boolean = false): Edge[] {
    return edges.map((e: Edge) => e.id === id ? {
        ...e,
        style: {
            ...e.style,
            stroke: e.style?.stroke === EdgeColor.VISITED ? (should_color_visited_edge ? EdgeColor.CURRENT : EdgeColor.VISITED) : EdgeColor.CURRENT
        }
    }
        : e);
}

// function for making previously visited yellow
function change_to_visited(edges: Edge[]): Edge[] {
    return edges.map((e: Edge) => e.style?.stroke === EdgeColor.CURRENT ? { ...e, style: { ...e.style, stroke: EdgeColor.VISITED } } : e);
}

// returns ids to change
function parse_ids_directed(source: string, neighbours: string[]): string[] {
    return neighbours.map((dest: string) => `${source}-${dest}`);
}

function parse_ids_undirected(source: string, neighbours: string[]): string[] {
    return neighbours.map((dest: string) => parseInt(source) > parseInt(dest) ? `${dest}-${source}` : `${source}-${dest}` );
}

// step spec: edges is neighbours, source is neigbours' src
export default function colorEdges(step: Step, edges: Edge[]): Edge[] {
    if (step.clear) {
        return reset_edge_color(edges);
    }
    edges = change_to_visited(edges);
    
    const edges_to_change: string[] = step.dest_nodes!;
    const src: string = step.source_node!;
    if (!edges_to_change || !src) {
        return edges;
    }
    let ids: string[] = [];

    // parsing edges invariant
    if (edges.some((e : Edge) => e.markerEnd === ARROW_SVG_ID)){
        ids = parse_ids_directed(src, edges_to_change);
    }
    else{
        ids = parse_ids_undirected(src, edges_to_change);
        import.meta.env.DEV ? console.log(ids) : null;
    }

    for (const id of ids) {
        edges = change_given_id(edges, id, step.should_color_visited_edge);
    }

    if (step.edge_removal){
        edges = edges.map((e : Edge) => ids.includes(e.id) ? {...e, markerEnd: (e.markerEnd ? INVISIBLE_ARROW : NO_ARROW), style: {...e.style, stroke: "white"}, labelStyle: {fill: 'white'}} : e);
    }

    return edges;
}