import { useShallow } from "zustand/shallow";
import useStore from "../store/store";
import { useReducer } from "react";
import { AppState } from "../../../shared/types/graph_map_types";
import { GraphAbstract, Guard, Step, Steps, VisualisationState } from "../../../shared/types/visualisation_types";
import colorNodes from "../../utility/functions/color_nodes";
import colorEdges from "../../utility/functions/color_edges";
import reset_edge_color from "../util/reset_edge_color";
import reset_node_color from "../util/reset_node_color";
import ProgressButtons from "./components/progress_buttons/progress_buttons";
import requirements_guard from "./util/requirements_guard";
import AlgorithmList from "./components/algorithm_list/algorithm_list";
import graph_director from "./util/graph_director";
import steps_evaluator from "./util/steps_evaluator";
import JsonGetter from "../store/json_getter";
import { NO_MESSAGE, NO_STEP, NOT_SELECTED } from "../../../shared/constants";
import AlgorithmHeader from "./components/algorithm_header/algorithm_header";
import reducer from "./store/reducer";
import { VisualisationActionType } from "../../../shared/enumerations/enums";
import { AggregationInterfaceNamed } from "../../../algorithms/algorithms_description/json_interfaces";
import { action_creator } from "./store/action_creator";
//import { Node, Edge } from "@xyflow/react";

const selector = (state: AppState) => ({
    nodes: state.nodes,
    edges: state.edges,
    setNodes: state.setNodes,
    setEdges: state.setEdges,
    setMessage: state.setMessage,
    setModifyMode: state.setModifyMode,
    modifyMode: state.modifyMode,
    selectedValue: state.selectedValue,
    setSelectedValue: state.setSelectedValue,
    directed: state.isDirected,
});

export default function Visualisation() {
    const { nodes, edges, setNodes, setEdges, setMessage, setModifyMode,
        modifyMode, selectedValue, setSelectedValue, directed } = useStore(useShallow(selector));

    const initial_state: VisualisationState = {
        chosen_function: JsonGetter.getAggregation('bfs'),
        steps: [],
        step_idx: NO_STEP,
        prev_step: undefined,
        first_prev: true
    }
    const [state, dispatch] = useReducer(reducer, initial_state);

    // function for handling next step of algorithm progression
    function next_step() {
        const value = state.first_prev ? 0 : 1;
        const step: Step = state.steps[state.step_idx + value];
        dispatch({ type: VisualisationActionType.SET_FIRST_PREV, payload: true })
        if (step) {
            const new_nodes = colorNodes(step, nodes);
            const new_edges = colorEdges(step, edges);
            setNodes(new_nodes);
            setEdges(new_edges)

            action_creator(dispatch, [{
                type: VisualisationActionType.SET_STEP_IDX,
                payload: state.step_idx + 1 + value
            }, {
                type: VisualisationActionType.SET_PREV_STEP,
                payload: { previous: state.prev_step, nodes: new_nodes, edges: new_edges }
            }]);

            // case when message exists
            setMessage({
                msg: step.msg,
                additional: step.additional_parsed,
                additional_name: step.additional_name,
                step_idx: step.step_idx,
                additional_snd: step.additional_snd_parsed,
                additional_snd_name: step.additional_snd_name
            });

        }
        // case when algorithm finished execution
        else {
            action_creator(dispatch,
                [{ type: VisualisationActionType.SET_STEP_IDX, payload: 0 },
                { type: VisualisationActionType.SET_STEPS, payload: [] }]
            )
            reset_graph();
            setMessage({ step_idx: NO_STEP, msg: NO_MESSAGE });
        }

    }

    function prev_step() {
        const value = state.first_prev ? 2 : 1;
        // if first prev decrement 2
        const step: Step = state.steps[state.step_idx - value];
        if (step) {
            action_creator(dispatch, [
                { type: VisualisationActionType.SET_FIRST_PREV, payload: false },
                { type: VisualisationActionType.SET_STEP_IDX, payload: state.step_idx - value }
            ])
            if (state.first_prev) {
                if (state.prev_step && state.prev_step?.previous) {
                    setNodes(state.prev_step.previous.nodes!);
                    setEdges(state.prev_step.previous.edges!);
                    dispatch({ type: VisualisationActionType.SET_PREV_STEP, payload: state.prev_step.previous.previous })
                }
            }

            else if (state.prev_step) {
                setNodes(state.prev_step.nodes);
                setEdges(state.prev_step.edges);
                dispatch({ type: VisualisationActionType.SET_PREV_STEP, payload: state.prev_step.previous })

            }

            // case when message exists
            setMessage({
                msg: step.msg,
                additional: step.additional_parsed,
                additional_name: step.additional_name,
                step_idx: step.step_idx,
                additional_snd: step.additional_snd_parsed,
                additional_snd_name: step.additional_snd_name
            });

        }

    }

    /* function for starting algorithm execution
    it basically initialize the graph with
    currently placed nodes and edges on the graph map*/
    function start() {
        if (nodes.length === 0 && edges.length === 0) {
            alert("Graph is empty, populate it");
            return;
        }
        setMessage({ msg: 'Starting Algorithm', step_idx: NO_STEP });
        setNodes(reset_node_color(nodes));
        setEdges(reset_edge_color(edges));

        const guard: Guard = { tree: state.chosen_function.require_tree, directed: state.chosen_function.require_directed, undirected: state.chosen_function.require_non_directed, weighted: state.chosen_function.require_weights };
        const graph: GraphAbstract = graph_director(guard, nodes, edges)!;

        const foo = JsonGetter.parseAlgorithm(state.chosen_function);
        // requirements checking for functions
        if (requirements_guard(guard, graph, directed)) {
            dispatch({ type: VisualisationActionType.SET_PREV_STEP, payload: undefined })

            try {
                const new_steps: Steps = steps_evaluator(graph, foo);
                setModifyMode(false);
                action_creator(dispatch,
                    [
                        { type: VisualisationActionType.SET_STEP_IDX, payload: 0 },
                        { type: VisualisationActionType.SET_STEPS, payload: new_steps }
                    ]
                )
            }
            catch (error) {
                if (error instanceof TypeError) {
                    setModifyMode(true);
                    dispatch({ type: VisualisationActionType.SET_STEPS, payload: [] })
                    alert("ERROR, the function might not be implemented in source code!")
                }
            }

        }
    }

    const reset_graph = () => {
        setNodes(reset_node_color(nodes));
        setEdges(reset_edge_color(edges));
        setModifyMode(true);
    }

    const setChosenFunction = (chosen_function: AggregationInterfaceNamed) => dispatch({ type: VisualisationActionType.SET_CHOSEN_FUNCTION, payload: chosen_function })

    // if user didnt choose algorithm, do not show progress buttons
    return (
        <div className="">
            {selectedValue !== NOT_SELECTED ?
                <ProgressButtons prev_step={prev_step} resetGraph={reset_graph} setModifyMode={setModifyMode} modifyMode={modifyMode} start={start} next_step={next_step} stepCount={state.steps.length - state.step_idx} /> : null}
            <AlgorithmHeader selectedValue={selectedValue} title={state.chosen_function.title} />
            <AlgorithmList resetGraph={reset_graph} setSelectedValue={setSelectedValue}
                setChosenFunction={setChosenFunction} />
        </div>
    );

}