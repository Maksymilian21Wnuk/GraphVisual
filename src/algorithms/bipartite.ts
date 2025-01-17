import { Steps } from "../shared/types/visualisation_types";
import Graph from "../shared/models/graph/graph";
import { Queue } from "queue-typescript";
import Colors from "../shared/models/colors/colors";


export default function bipartite(g: Graph): Steps {
    let visited = new Set<string>();
    // for color visualization

    // map color, let 0 be blue and 1 red
    let map_color = new Colors();

    const BLUE = map_color.next_color();
    const RED = map_color.next_color();
    const NOT_COLORED = map_color.get_not_colored();

    g.get_nodes().map((n: string) => map_color.set_color(n, NOT_COLORED))

    let fst = false;
    for (let start of g.get_nodes()) {
        if (map_color.get_color(start) == NOT_COLORED) {
            if (fst){
                g.add_step({
                    step_idx: 4,
                    additional: visited,
                    additional_name: "Visited:"
                })
            }
            fst = true;
            let q: Queue<string> = new Queue<string>(start);
            map_color.set_color(start, BLUE);
            

            g.add_step({
                msg: ``, step_idx: 0,
                additional_snd_name: `Visited:`, additional_snd: visited,
                colorize_nodes: map_color
            })
            while (q.length > 0) {

                let node: string = q.dequeue();

                g.add_step({
                    step_idx: 1,
                    additional: q, additional_name: `Queue:`,
                    additional_snd_name: `Visited:`, additional_snd: visited,
                    colorize_nodes: map_color,
                    current_node: node
                });
                visited.add(node);

                let neighbours = g.get_neighbours(node);

                g.add_step({
                    dest_nodes: neighbours, source_node: node, step_idx: 2,
                    should_color_visited_edge: true,
                    additional: q, additional_name: `Queue:`,
                    additional_snd_name: `Visited:`, additional_snd: visited,
                    colorize_nodes: map_color
                })
                const current_color = map_color.get_color(node)
                for (let neighbour of neighbours) {
                    if (map_color.get_color(neighbour) === NOT_COLORED) {
                        map_color.set_color(neighbour, current_color === BLUE ? RED : BLUE)
                        q.enqueue(neighbour)
                    }
                    else if (map_color.get_color(neighbour) === current_color) {
                        g.add_step({
                            step_idx: 5,
                            colorize_nodes: map_color,
                            msg: `Graph is not bipartite, ${neighbour} and ${node} have same color`
                        });
                        return g.get_steps();
                    }
                }
                g.add_step({
                    additional: q,
                    additional_name: `Queue:`,
                    step_idx: 3,
                    additional_snd_name: `Visited:`, additional_snd: visited,
                    colorize_nodes: map_color
                });


            }
        }

    }



    g.add_step({
        step_idx: 5,
        colorize_nodes: map_color,
        msg: `Graph is bipartite`
    })
    return g.get_steps();
}