import { Node } from "@xyflow/react";
import { NODE_MAX } from "../../../../../shared/constants";

/**
 *
 * Function for finding
 * first free label of node
 * Modification of bucket sort
 * @param idx_arr array of currently held indexes on map
 * @returns first free number label
 */

function find_first_free_index(idx_arr: number[]): string {
    if (idx_arr.length == 0) {
        return "1";
    }
    else {
        let sorted_arr : boolean[] = Array(NODE_MAX + 1).fill(false);

        for (let idx = 0; idx < idx_arr.length; idx++) {
            sorted_arr[idx_arr[idx]] = true; 
        }

        for (let idx = 1; idx < sorted_arr.length; idx++) {
            if (!sorted_arr[idx]){
                return String(idx);
            }
        }
        return "1"

    }
}
/**
 * Finds first free available id for new node spawn
 * @param nodes current nodes
 * @returns index of available free idx
 */
export default function find_first_free(nodes: Node[]): string {
    return find_first_free_index(nodes.map((n: Node) => parseInt(n.id)));
}