import React, { useReducer, useRef } from "react";
import {
    ReactFlow,
    Node,
    Edge,
    useReactFlow,
    XYPosition
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useStore from "../store/store";
import reducer from "../store/reducer";
import { AppState, GraphState } from "../../../shared/types/graph_map_types";
import { useShallow } from "zustand/shallow";
import { Weight } from "../../../shared/enumerations/enums";
import { ARROW_SVG_ID, MIN_ZOOM, NODE_MAX, nodeDefaultStyle } from "../../../shared/constants";
import find_first_free from "./functions/find_first_free_index/find_first_free_index";
import getRandomInt from "../../utility/functions/random_int";
import CustomControls from "./custom_controls/custom_controls";
import CustomMarker from "./components/custom_edge/marker";
import convert_to_undirected from "./functions/convert_to_undirected/convert_to_undirected";
import { ActionType } from "../../../shared/enumerations/enums";
import Additionals from "./components/additionals/additionals";
import reset_edge_color from "../util/reset_edge_color";
import reset_node_color from "../util/reset_node_color";
import make_edge_directed from "./functions/make_edge_directed/make_edge_directed";
import handle_connection from "./functions/handle_connection/handle_connection";
import onDownload from "./functions/on_download/on_download";
import Representation from "./components/structure/representation/representation";
import DirectedGraph from "../../../shared/models/directed_graph/directed_graph";
import { EdgeModal } from "./components/edge_modal";

const selector = (state: AppState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    setNodes: state.setNodes,
    setEdges: state.setEdges,
    message: state.message,
    setModifyMode: state.setModifyMode,
    modifyMode: state.modifyMode,
    selectedValue: state.selectedValue,
    isDirected: state.isDirected,
    setIsDirected: state.setIsDirected,
    isWeighted: state.isWeighted,
    setIsWeighted: state.setIsWeighted,
});


export default function GraphView() {
    const { nodes, edges, onNodesChange, onEdgesChange, setNodes, setEdges, message, setModifyMode, modifyMode, isDirected, setIsDirected, isWeighted, setIsWeighted } = useStore(useShallow(selector));

    const reactFlow = useReactFlow();

    const ref = useRef<HTMLDialogElement>(null);

    const initialState: GraphState = {
        removeMode: false,
        addMode: false,
        first: -1,
        connect: false,
        edge_to_change: { id: "-1", source: "1", target: "2" },
    };


    const [state, dispatch] = useReducer(reducer, initialState);

    // looks weird, maybe to change
    function onNodeClick(_event: React.MouseEvent<Element, MouseEvent>, node: Node) {
        reset_graph();

        import.meta.env.DEV ? console.log(nodes) : null;

        if (state.removeMode) {
            setNodes(reset_node_color(nodes.filter((n: Node) => n.id !== node.id)));
            setEdges(reset_edge_color(edges.filter((e: Edge) => e.source !== node.id && e.target !== node.id)));
        }
        else if (state.addMode) {
            if (state.connect) {
                const new_edges = handle_connection(isDirected, state.first, node.id, dispatch, isWeighted, edges);
                // handle the case if connection cannot be made
                if (new_edges === null) {
                    return;
                }
                // handle case when node clicked already has the connection,
                // then dispatch as the second clicked will be next to connect
                else if (typeof new_edges === 'number') {
                    dispatch({ type: ActionType.SET_PAIR, payload: parseInt(node.id) });
                    return;
                }
                else {
                    setEdges(new_edges);
                    dispatch({ type: ActionType.SET_PAIR, payload: -1 });
                }
            }
            // handle click of first node, do not connect now
            // next click will connect them
            else {
                dispatch({ type: ActionType.SET_PAIR, payload: parseInt(node.id) });
            }
        }
        else {
            return;
        }
    }

    function onEdgeClick(_event: React.MouseEvent<Element, MouseEvent>, edge: Edge): void {
        reset_graph();
        if (state.removeMode) {
            setEdges(edges.filter((e: Edge) => e.id !== edge.id))
        }
        else if (state.addMode && isWeighted) {
            if (ref.current) {
                ref.current.showModal()
                dispatch({ type: ActionType.CHANGE_EDGE, payload: edge });
            }
        }
        else if (isDirected) {
            setEdges([...edges.filter((e: Edge) => e.id !== edge.id), {
                id: String(edge.target) + "-" + String(edge.source), source: edge.target, target: edge.source, type: 'straight', label: edge.label,
                style: { stroke: "black" }, markerEnd: ARROW_SVG_ID
            }]);
        }

    }


    function onPaneClick(event: React.MouseEvent<Element, MouseEvent>): void {
        import.meta.env.DEV ? console.log(edges) : null;
        import.meta.env.DEV ? console.log(nodes) : null;
        import.meta.env.DEV ? console.log("DBG: ", isDirected, isWeighted) : null;

        if (nodes.length >= NODE_MAX) {
            alert("Can't spawn node, too many nodes on viewport");
            return;
        }

        reset_graph();
        if (state.addMode) {
            let xy: XYPosition = { x: event.clientX, y: event.clientY };
            xy = reactFlow.screenToFlowPosition(xy);
            const first_free: string = find_first_free(nodes);
            const new_node = { id: first_free, position: { x: xy.x - 25, y: xy.y - 25 }, data: { label: first_free }, ...nodeDefaultStyle };
            setNodes([...reset_node_color(nodes), new_node]);
        }
    }


    const random_weight = () => {
        setModifyMode(true);
        setEdges(edges.map((e: Edge) => { return { ...e, label: String(getRandomInt(NODE_MAX)) } }));
        setIsWeighted(true);
    };

    const clear = () => {
        setEdges([]);
        setNodes([]);
        setModifyMode(true);
    }


    const no_weights = () => {
        setModifyMode(true);
        setEdges(edges.map((e: Edge) => { return { ...e, label: Weight.UNWEIGHTED } }));
        setIsWeighted(false);
    }

    const set_directed = () => {
        reset_graph()
        if (isDirected) {
            // remove arrows holding invariant
            import.meta.env.DEV ? console.log(convert_to_undirected(edges)) : null;
            setEdges(convert_to_undirected(reset_edge_color(edges)));
            setIsDirected(false);
        }
        // give arrows to edges
        else {
            setEdges(reset_edge_color(edges.map((e: Edge) => make_edge_directed(e))));
            setIsDirected(true);
        }
    }

    const reset_graph = () => {
        setModifyMode(true);
        if (!modifyMode) {
            setEdges(reset_edge_color(edges));
            setNodes(reset_node_color(nodes));
        }
    }


    const onFitView = () => {
        reactFlow.fitView();
    }


    return (
        <>
            <CustomMarker />
            <EdgeModal ref={ref} edge_to_change={state.edge_to_change} updateEdge={reactFlow.updateEdge} />
            <div className="bg-white w-screen md:w-3/5 max-auto md:h-[300px] lg:h-[400px] border-2 border-black font-sans">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onEdgeClick={onEdgeClick}
                    onNodeClick={onNodeClick}
                    snapToGrid={true}
                    fitView
                    nodesConnectable={false}
                    onPaneClick={onPaneClick}
                    minZoom={MIN_ZOOM}
                    snapGrid={[15, 15]}>
                    <CustomControls
                        onDownload={() => onDownload(nodes, reactFlow)}
                        onFitView={onFitView}
                        setIsDirected={set_directed}
                        noWeights={no_weights}
                        dispatch={dispatch}
                        clearGraph={clear}
                        randomizeWeight={random_weight}
                        chosen={state.first} />
                </ReactFlow>
            </div>
            <div className="w-1/5">
                {modifyMode ?
                    <div className="px-4">
                        <Representation graph={new DirectedGraph(nodes, edges)} />
                    </div>
                    : null}

                <Additionals additional_snd={message.additional_snd}
                    additional_snd_name={message.additional_snd_name}
                    step_idx={message.step_idx}
                    msg={message.msg}
                    additional={message.additional}
                    additional_name={message.additional_name}
                    modifyMode={modifyMode} />
            </div>
        </>
    );
}