
// format: `{$SOURCE}e{$TARGET}`

import { Queue } from "queue-typescript";
import DirectedGraph from "../models/directed_graph/directed_graph";
import { DisjointSetCustom } from "../models/disjoint_set_custom/disjoint_set_custom";
import { Edge, Node } from "@xyflow/react";
import Graph from "../models/graph/graph";
import WeightedGraph from "../models/weighted_graph/weighted_graph";
import TreeGraph from "../models/tree_graph/tree_graph";
import Colors from "../models/colors/colors";
import { VisualisationActionType } from "../enumerations/enums";
import { AggregationInterfaceNamed } from "../../algorithms/algorithms_description/json_interfaces";
/*
Types used in visualisation and
writing own algorithms,
includes definition of step for algos,
message, algorithm
*/


export type PlainEdge = {
    source: string;
    dest: string;
    weight?: number;
}

type Stack = string[];

export type AdditionalType = Map<string, number> | DisjointSetCustom | Set<string> | Queue<string> | Stack | Array<PlainEdge>;


/**
 * Represents the singular step for algorithms visualisation.
 * Steps are added in algorithms using g.add_step() method.
 * @property {number} step_idx - asdf
 */
export type Step = {
    /** Index of step currently highlighted in visualisation */
    step_idx: number;

    /** Current node in visualisation. By default it colors node to red. */
    current_node?: string;

    /** Array of nodes currently being visited. This is colored by default to orange. */
    nodes?: string[];

    /** Source node, from which edges are colored */
    source_node?: string;

    /** Destination array of nodes, to which edges are colored */
    dest_nodes?: string[];

    /** Message displayed on top of additionals on page, keep it as short and simple as possible */
    msg?: string;

    /** Member of type AdditionalType for visualisation additional structures, 
     * it takes for example Queue, Map or DisjointSetCustom */
    additional?: AdditionalType;

    /** Member of type AdditionalType, displayed next to additional.
     * For displaying second additional structure.
     */
    additional_snd?: AdditionalType;

    /** Name displayed over first additional */
    additional_name?: string;

    /** Name displayed over second additional */
    additional_snd_name?: string;

    /** If user wants to pre-parse additional, he can pass array of objects of type additional */
    additional_parsed?: Additional[];

    /** If user wants to pre-parse second additional, he can pass array of objects of type additional */
    additional_snd_parsed?: Additional[];

    /** If true, it will color nodes that were previously visited to orange,
     * by default it's false, since in most algorithms we will not check already
     * visited nodes
     */
    should_color_visited?: boolean;

    /** If true, will color already visited edges to orange. By default false.*/
    should_color_visited_edge?: boolean;

    /** If true, in this step the edges (that is source and dest nodes) will be considered
     * as edges to remove. Those will be removed from graph panel.
     */
    edge_removal?: boolean;

    colorize_nodes?: Colors;

    /** If true, this step will reset graph's colors. This makes sense
     * in, for example, algorithms that require 2 dfs (kosaraju).
     */
    clear?: boolean;
};

export type PreviousStep = {
    nodes: Node[];
    edges: Edge[];
    previous: PreviousStep | undefined;
}

export type Steps = Step[]

export type NoValue = "";

export type Additional = {
    id: string;
    value: string | NoValue;
}

export type Message = {
    msg?: string;
    // first additional showing on right side...
    additional?: Additional[];
    // name of additional 
    additional_name?: string;
    // ... and second
    additional_snd?: Additional[];
    additional_snd_name?: string;
    modifyMode?: boolean;
    // must be explicitly given
    // for coloring the current step
    step_idx: number;
};


// type of visualization algorithm
export type DirectedFunction = (g: DirectedGraph) => Steps;
export type GraphFunction = (g: Graph) => Steps;
export type WeightedFunction = (g: WeightedGraph) => Steps;
export type TreeFunction = (g: TreeGraph) => Steps;

export type Guard = {
    weighted: boolean;
    directed: boolean;
    undirected: boolean;
    tree: boolean;
}

export type GraphAbstract = Graph | DirectedGraph | WeightedGraph | TreeGraph;
export type GraphFunctionAbstract = GraphFunction | DirectedFunction | TreeFunction | WeightedFunction;

/*
type Requirements = {
    weights: boolean;
    directed: boolean;
    non_directed: boolean;
    tree: boolean;
}*/

// algorithm requires: function, name of algorithm
// or some guards
export type Algorithm = {
    foo: DirectedFunction | GraphFunction | WeightedFunction | TreeFunction;
    name: string;
    require_weights: boolean;
    require_directed: boolean;
    require_non_directed: boolean;
    require_tree: boolean;
    description?: string;
    dev?: boolean;
};

export type StructureInterface = {
    graph: DirectedGraph;
}

export type VisualisationPayload = AggregationInterfaceNamed
    | Steps | number | PreviousStep
    | undefined | boolean;

export type VisualisationAction = {
    type: VisualisationActionType;
    payload: VisualisationPayload;
}

export type VisualisationState = {
    chosen_function: AggregationInterfaceNamed;
    steps: Steps;
    step_idx: number;
    prev_step: PreviousStep | undefined;
    first_prev: boolean;
}
