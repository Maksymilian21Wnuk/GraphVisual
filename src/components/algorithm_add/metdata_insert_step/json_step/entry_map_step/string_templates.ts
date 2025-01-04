
/**
 * 
 * @param algo_name name of algorithm
 * @returns example text for entry_map_step component
 */
export const text_example = (algo_name : string) => 
    `Append function name: ${algo_name} to map in /src/algorithms/Algorithms_map.ts.
    It should look like this:`


/**
 * 
 * @param algo_name name of algorithm
 * @returns example code for entry_map_step component. Should
 * return text for mapping from string function's name to function name
 */
export const code_example = (algo_name: string) =>
    `import bfs from "../bfs";
// ... and so on
import ${algo_name} from "../${algo_name}"; // HERE paste import


export const AlgorithmsMap = new Map<string, GraphFunctionAbstract> ([
    ["bfs", bfs],
    //... and so on
    ["kahn", kahn],
    ["kosaraju", kosaraju],
    ["${algo_name}", ${algo_name}], // HERE goes your function name entry
])`