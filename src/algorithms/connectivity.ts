import { Queue } from "queue-typescript";
import Graph from "../shared/models/graph/graph";
import { Steps } from "../shared/types/visualisation_types";



// copied from bfs
export default function connectivity_check(g: Graph): Steps {
    let visited = new Set<string>();
    let queue = new Queue<string>(g.get_start_node());
    g.add_step({ additional_name: `Queue:`, step_idx: 0, additional: queue })
    // to change

    while (queue.length > 0) {
        let node: string = queue.dequeue();

        g.add_step({ nodes: [node], step_idx: 1, additional: queue, additional_name: `Queue:`, current_node: node, additional_snd: visited, additional_snd_name: `Visited:` });
        visited.add(node);
        let neighbours = g.get_neighbours(node);
        for (let neighbour of neighbours) {
            if (!visited.has(neighbour)) {
                queue.enqueue(neighbour);
                visited.add(neighbour);
            }
        }
        g.add_step({ dest_nodes: neighbours, source_node: node, nodes: neighbours, step_idx: 2, additional: queue, additional_name: `Queue:`, additional_snd: visited, additional_snd_name: `Visited:` })
        g.add_step({ additional: queue, additional_name: `Queue:`, step_idx: 3, additional_snd: visited, additional_snd_name: `Visited:` });
    }

    g.add_step({ step_idx: 4, msg: `Queue empty`
    })

    g.add_step({
        additional_name: "Visited:", additional_snd_name: "Graph's nodes:", step_idx: 5,
        additional: visited, additional_snd: g.get_nodes()
    })
    if (visited.size != g.get_node_count()) {
        g.add_step({ msg: `Graph is not connected, visited ${visited.size} of ${g.get_node_count()} nodes`, step_idx: 6 });
    }
    else {
        g.add_step({ msg: `Graph is connected`, step_idx: 6 });
    }

    return g.get_steps();
}