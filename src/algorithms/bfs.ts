import DirectedGraph from "../shared/models/directed_graph/directed_graph";
import { Steps } from "../shared/types/visualisation_types";
import { Queue } from "queue-typescript";


export default function bfs(g: DirectedGraph): Steps {
    let visited = new Set<string>();
    let queue = new Queue<string>(g.get_start_node());

    g.add_step({ additional_name: `Queue:`, 
        additional: queue, 
        step_idx: 0, 
        current_node: g.get_start_node()})


    while (queue.length > 0) {
        let node: string = queue.dequeue();
        g.add_step({
            step_idx: 1, 
            additional: queue, additional_name: `Queue:`, 
            current_node: node, additional_snd_name: `Visited:`, additional_snd: visited });
        
        visited.add(node);
        let neighbours : string[] = g.get_neighbours(node);

        g.add_step({ dest_nodes: neighbours,
            current_node: node,
            source_node: node, 
            nodes: neighbours, 
            step_idx: 2, 
            additional: queue, additional_name: `Queue:`, 
            additional_snd: visited, additional_snd_name: `Visited:`  })

        for (let neighbour of neighbours) {
            if (!visited.has(neighbour)) {
                queue.enqueue(neighbour);
                visited.add(neighbour);
            }
        }
        g.add_step({
            additional: queue,
            additional_name: `Queue:`,
            step_idx: 3,
            additional_snd_name: `Visited:`, 
            additional_snd: visited
        });


    }
    g.add_step({
        step_idx: 4, additional: queue,
        additional_name: `Queue:`, additional_snd_name: `Visited:`, additional_snd: visited
    })

    g.add_step({ step_idx: 5 });

    return g.get_steps();
}