import { NodeColor } from "../../../shared/enumerations/enums";
import { Step } from "../../../shared/types/visualisation_types"
import { Node } from "@xyflow/react"
import reset_node_color from "../../graphs/util/reset_node_color";


// spec: given id of nodes color only those nodes O(n)
function change_given_id(nodes : Node[], id : string, color : string, should_color_visited : boolean = false) : Node[]{
    // gimmick: do not color visited nodes, should change
    return nodes.map((n : Node) => (n.id === id && (should_color_visited ? true : n.style?.background) !== NodeColor.VISITED) ? {...n, style : {...n.style, background: color}} : n);
}

// function for making previously visited yellow, O(n) time n = nodes.length
function change_to_visited(nodes : Node[], color : string) : Node[] {
    return nodes.map((n : Node) => n.style?.background === NodeColor.CURRENTLY_VISITING || n.style?.background === NodeColor.CURRENT ? {...n, style : {...n.style, background: color}} : n);
}
/*
function omit_position(node: Node) : Partial<Node> {
    const {position, ...rest} = node;
    return rest;
}

function map_positions(nodes : Node[]) : Partial<Node>[] {
    return nodes.map((n : Node) => omit_position(n));
}*/


// simple for, wanted to make code more readable
export default function colorNodes(step : Step, nodes : Node[]) : Node[]{
    if (step.clear) {
        return reset_node_color(nodes);
    }

    nodes = change_to_visited(nodes, NodeColor.VISITED);
    // the property nodes gives nodes to change color
    let nodes_to_change : string[] = step.nodes!;

    // if we want to colorize nodes, ignore coloring
    // unvisited and visited
    if (step.colorize_nodes !== undefined) {
        step.colorize_nodes?.get_colors_map().forEach((color, node) => {
            nodes = change_given_id(nodes, node, color[1], true);
        });
        if (step.current_node){
            nodes = change_given_id(nodes, step.current_node, NodeColor.CURRENT, true);    
        }

        return nodes;
    }

    // if no nodes to change, return previous set of nodes
    if (!nodes_to_change){
        // sometimes we just want to color current node only
        if (step.current_node){
            nodes = change_given_id(nodes, step.current_node, NodeColor.CURRENT, true);    
        }
        return nodes;
    }
    for (let id of nodes_to_change) {
        nodes = change_given_id(nodes, id, NodeColor.CURRENTLY_VISITING, step.should_color_visited);
    }

    // we want to color current node 
    if (step.current_node){
        nodes = change_given_id(nodes, step.current_node, NodeColor.CURRENT, true);
    }

    return nodes;
}