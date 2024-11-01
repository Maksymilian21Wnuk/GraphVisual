import dfs from "./dfs";
import bfs from "./bfs";
import { Algorithm } from "../shared/types/visualisation_types";
import connectivity_check from "./connectivity";
import dijkstra from "./dijkstra";
import kruskal from "./kruskal";
import topological_sort from "./kahn";
import bipartite from "./bipartite";
import tree_path_find from "./tree_path_find";


export const algos : Algorithm[] = [
    { description:`Graph traversal with queue structure`, foo : bfs, name : "Breadth first search", require_weights: false, require_directed: false, require_non_directed: false, require_tree: false},
    { description:`Graph traversal with recursive approach`, foo : dfs, name : "Depth first search", require_weights: false, require_directed: false, require_non_directed: false, require_tree: false},
    { description:`Check if given undirected graph is connected`, foo : connectivity_check, name : "Connectivity check", require_weights: false, require_directed: false, require_non_directed: true, require_tree: false},
    { description:`Find all shortest paths in weighted graph`, foo : dijkstra, name : "Dijkstra's shortest path", require_weights: true, require_directed: false, require_non_directed: false, require_tree: false},
    { description:`Find spanning tree using sorted edge array and union-find data structure`, foo : kruskal, name: "Kruskal's MST", require_weights: true, require_directed: false, require_non_directed: true, require_tree: false},
    { description:`Sort graph topologically`, foo : topological_sort, name: "Kahn's topological sort", require_weights: false, require_directed: true, require_non_directed: false, require_tree: false},
    { description:`Check if given graph is bipartite`, foo : bipartite, name: "Biparte Graph check", require_weights: false, require_directed: false, require_non_directed: true, require_tree: false},
    { description:`Find paths in tree using BFS`, foo : tree_path_find, name: "Tree's shortest paths", require_weights: false, require_directed: false, require_non_directed: true, require_tree: true},
]