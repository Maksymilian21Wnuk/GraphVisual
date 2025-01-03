import { Node, Edge } from "@xyflow/react";
import { Additional, AdditionalType, PlainEdge, Step, Steps } from "../../types/visualisation_types";
import { Queue } from "queue-typescript";
import { DisjointSetCustom } from "../disjoint_set_custom/disjoint_set_custom";
import get_currently_clicked from "../../../components/utility/functions/get_currently_clicked";
import { NO_VALUE } from "../../constants";


/**
 * Plain graph model for visualisation,
 * provides API for writing algorithms
 */
export default class Graph{

    protected edges : Map<string, string[]>;
    protected nodes : string[];
    protected start_node : string;
    protected steps : Steps =  [];

    constructor(nodes?: Node[], edges?: Edge[]){
        this.edges = new Map<string, string[]>();
        this.nodes = [];
        this.start_node = "1";
        this.steps = [];

        if (nodes && edges){
            this.edges = this.convert_flow(edges);
            this.nodes = nodes.map((node : Node) => node.id);
            this.start_node = get_currently_clicked(nodes);
        }
    }

    /**
     * 
     * @param edges react flow's edge representation
     * @returns plain graph's edge representation
     */
    protected convert_flow(edges : Edge[]) : Map<string, string[]>{
        let neighbours = new Map<string, string[]>();
        for (const edge of edges){
            if (neighbours.has(edge.source)){
                neighbours.set(edge.source, [...neighbours.get(edge.source)!, edge.target]);
            }
            else{
                neighbours.set(edge.source, [edge.target]);
            }
    
            if (neighbours.has(edge.target)){
                neighbours.set(edge.target, [...neighbours.get(edge.target)!, edge.source]);
            }
            else{
                neighbours.set(edge.target, [edge.source]);
            }
        }
    
        return neighbours;
    
    }
    /**
     * Get neighbours of node
     * @param node node id
     * @returns id's of node's neighbours
     */
    get_neighbours(node : string) : string[]{
        return this.edges.get(node) || [];
    }

    private add_additional(additional : AdditionalType) : Additional[] {
        let res : Additional[] = [];
        if (!additional) {
            return res;
        }

        else if (additional instanceof Queue) {
            additional.toArray().forEach((element: string) => {
                res.push({ id: element, value: NO_VALUE })
            });
        }

        else if (additional instanceof Map) {
            additional = new Map([...additional].sort((a, b) => a[1] - b[1]));
            additional.forEach((value: number, key: string) => {
                res.push({ id: key, value: String(value) });
            })
        }
        else if (additional instanceof DisjointSetCustom) {
            additional.get_sets().forEach((value : string[], key : string) => {
                res.push({id: key + `)`, value: value.join(" ")});
            }
        )
        }
    
        // handle set, that is visited
        else if (additional instanceof Set) {
            additional.forEach((value: string) => {
                res.push({ id: value, value: NO_VALUE });
            })
        }
        // handle stack
        else if (Array.isArray(additional) && additional.every(a => typeof a === 'string')) {
            additional.forEach((value: string) => {
                res.push({ id: value, value: NO_VALUE });
            })
        }
    
        // handle case of edge type
        else if (Array.isArray(additional)) {
            additional.forEach((edge: PlainEdge) => {
                res.push({ id: `${edge.source}e${edge.dest}`, value: String(edge.weight ? edge.weight : NO_VALUE) });
            })
        }
        return res;
    }
    /**
     * Add steps to algorithm's visualisation
     * @param step step of algorithm to be visualised on view
     */
    add_step(step : Step) : void {
        step.additional_parsed =  step.additional_parsed ? step.additional_parsed : this.add_additional(step.additional!);
        step.additional_snd_parsed = step.additional_snd_parsed ? step.additional_snd_parsed :this.add_additional(step.additional_snd!);
        step.colorize_nodes = step.colorize_nodes?.clone();
        this.steps.push(step);
    }

    /**
     * Get steps
     * @returns steps after algorithm's execution
     */
    get_steps() : Steps {
        return this.steps;
    }

    /**
     * this should be removed
     * @param steps steps to set
     */
    set_steps(steps : Steps) : void {
        this.steps = steps;
    }

    /**
     * 
     * @returns Node count of graph
     */
    get_node_count() : number {
        return this.nodes.length;
    }

    /**
     * 
     * @returns Edge count of graph
     */
    get_edge_count() : number { 
        return Array.from(this.edges.values()).reduce((sum, arr) => sum + arr.length, 0) / 2;
    }
    /**
     * Start node is currently clicked node
     * in react flow's representation
     * @returns Start node of graph
     */
    get_start_node() : string {
        return this.start_node;
    }

    /**
     * Method for getting
     * node list of graph
     * @returns nodes list of graph
     */
    get_nodes() : string[] {
        return this.nodes;
    }
    /**
     * Method for getting map which
     * for key nodeId returns list of
     * nodes adjacent to it (neighbours)
     * @returns map of edges of graph
     */
    get_edges() : Map<string, string[]> {
        return this.edges;
    }

}


