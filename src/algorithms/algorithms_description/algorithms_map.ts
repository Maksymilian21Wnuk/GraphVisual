import bfs from "../bfs";
import bipartite from "../bipartite";
import connectivity_check from "../connectivity";
import dfs from "../dfs";
import dijkstra from "../dijkstra";
import kahn from "../kahn";
import kosaraju from "../kosaraju";
import kruskal from "../kruskal";
import { GraphFunctionAbstract } from "../../shared/types/visualisation_types";
import tree_path_find from "../tree_path_find";
/**
 * Mapping string -> function
 * string is valid function name 
 * that represents visualisation function
 */
export const AlgorithmsMap = new Map<string, GraphFunctionAbstract>([
    ["bfs", bfs],
    ["dfs", dfs],
    ["bipartite", bipartite],
    ["connectivity_check", connectivity_check],
    ["tree_path_find", tree_path_find],
    ["dijkstra", dijkstra],
    ["kahn", kahn],
    ["kosaraju", kosaraju],
    ["kruskal", kruskal]
])