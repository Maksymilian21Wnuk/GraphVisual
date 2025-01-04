import Colors from "../shared/models/colors/colors";
import DirectedGraph from "../shared/models/directed_graph/directed_graph";
import { Steps } from "../shared/types/visualisation_types";

// this might be badddd todo

function dfs_recursive(vertice: string, visited: Set<string>, g: DirectedGraph, kosaraju_stack : string[], colors? : Colors, col_idx? : number) {
    if (visited.has(vertice)) {
        return;
    }
    else {
        if (colors !== undefined && col_idx !== undefined) {
            colors.set_color(vertice, col_idx);
            g.add_step({
                step_idx: 5,
                current_node: vertice,
                additional: visited, additional_name: `Visited:`,
                additional_snd: kosaraju_stack, additional_snd_name: `Exhaustion stack:`,
                colorize_nodes: colors
            })    
        }
        else{
            g.add_step({
                step_idx: 1,
                current_node: vertice,
                additional: visited, additional_name: `Visited:`,
                additional_snd: kosaraju_stack, additional_snd_name: `Exhaustion stack:`
            })
        }

        visited.add(vertice);

        for (const nei of g.get_neighbours(vertice)) {
            dfs_recursive(nei, visited, g, kosaraju_stack, colors, col_idx);
        }
        // if not colors we dont want to push
        if (!colors && !col_idx){
            kosaraju_stack.push(vertice)
            g.add_step({
                step_idx: 2,
                current_node: vertice,
                additional: visited, additional_name: `Visited:`,
                additional_snd: kosaraju_stack, additional_snd_name: `Exhaustion stack:`
            })
        }
        else{
            g.add_step({
                step_idx: 6,
                current_node: vertice,
                additional: visited, additional_name: `Visited:`,
                additional_snd: kosaraju_stack, additional_snd_name: `Exhaustion stack:`,
                colorize_nodes: colors
            })
        }

    }
}



export default function kosaraju(g: DirectedGraph): Steps {
    let visited = new Set<string>();
    let kosaraju_stack : string[] = [];

    for (const node of g.get_nodes()) {
        if (!visited.has(node)){
            g.add_step({step_idx: 0, current_node: node})
            dfs_recursive(node, visited, g, kosaraju_stack);
        }
    }

    g.add_step({ step_idx: 3 });    

    g.transpose()

    let colors = new Colors();
    visited = new Set<string>();
    while (kosaraju_stack.length !== 0) {
        let node = kosaraju_stack.pop()!
        if (!visited.has(node)){
            g.add_step({step_idx: 4, current_node: node})
            const col_idx = colors.next_color()
            dfs_recursive(node, visited, g, kosaraju_stack, colors, col_idx);
        }
    }

    g.add_step({step_idx: 7, colorize_nodes: colors})
    return g.get_steps();
}