import DirectedGraph from "../../../../../../shared/models/directed_graph/directed_graph";






export default function get_matrix_repr(graph : DirectedGraph) : number[][] {
    const len = graph.get_node_count();
    let matrix : number[][] = Array.from({length: len + 1},() => Array(len + 1).fill(0));

    const nodes : string[] = graph.get_nodes();
    const parsed_nodes : number[] = nodes.map((n) => parseInt(n));
    for (let x = 0; x < len; x++) {
        matrix[x + 1][0] = parsed_nodes[x];
        matrix[0][x + 1] = parsed_nodes[x];
    }

    for (let x = 1; x < len + 1; x++) {
        for (let y = 1; y < len + 1; y++) {
            const w1 = graph.get_weight(nodes[x - 1], nodes[y - 1])!;
            const w2 = graph.get_weight(nodes[y - 1], nodes[x - 1])!;
            matrix[x][y] = w1;
            matrix[y][x] = w2;
        }
    }

    return matrix
}