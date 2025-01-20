import DirectedGraph from "../../../../../../shared/models/directed_graph/directed_graph";


function parse_weighted(graph : DirectedGraph) {
    let parsed : string[] = ["{"];

    for (let node of graph.get_nodes()) {
        let current = "     " + node + ": {"
        const neighbours = graph.get_neighbours(node);
        for (let nei of neighbours) {
            current += `${nei}: ${graph.get_weight(node, nei)}, `
        }
        if (neighbours.length !== 0){
            current = current.slice(0, -2)
        }
        parsed.push(current + "},")
    }


    return parsed.join("\n").slice(0, -1) + "\n}";
}

function parse_unweighted(graph : DirectedGraph) { 
    let parsed : string[] = ["{"];

    for (let node of graph.get_nodes()) {
        let current = "     " + node + ": ["
        const neighbours = graph.get_neighbours(node);
        for (let nei of neighbours) {
            current += nei + ","
        }

        if (neighbours.length !== 0){
            current = current.slice(0, -1)
        }

        parsed.push(current + "],")
    }

    return parsed.join("\n").slice(0, -1) + "\n}";
}

export default function code_parser(graph : DirectedGraph) : string {
    return graph.get_is_weighted() ? parse_weighted(graph) : parse_unweighted(graph);
}