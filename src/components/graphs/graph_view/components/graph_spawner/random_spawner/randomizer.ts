
// randomize graph edges given probability

import { Edge, Node } from "@xyflow/react";
import { NO_WEIGHT, nodeDefaultStyle } from "../../../../../../shared/constants";
import generate_ids from "./generate_ids";
import positioning from "./positioning";

interface Graph {
    nodes: Node[];
    edges: Edge[];
}



export default function randomizer(probability: number, node_count: number): Graph {
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let defaultNode: Node = { id: "0", position: { x: 0, y: 0 }, data: { label: "" }, ...nodeDefaultStyle };
    let defaultEdge: Edge = {id: "1-2", source: "1", target: "2", type: 'straight', style: { stroke: "black" }, label: NO_WEIGHT }

    const positions = positioning(node_count);
    for (let x = 1; x < node_count + 1; x++) {
        nodes.push({ ...defaultNode, position: positions[x - 1] ,id: String(x), data: { label: String(x) } });
    }

    
    const generated = generate_ids(node_count, probability);
    
    for (const g of generated) {
        edges.push({...defaultEdge, id: g.id, target: g.target, source: g.source});

    }



    return { nodes, edges };
}