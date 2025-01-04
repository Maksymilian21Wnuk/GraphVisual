import { useState } from "react";
import { AppState } from "../../../../../shared/types/graph_map_types";
import { graph_preset } from "./preset/graph_preset";
import { useReactFlow } from "@xyflow/react";
import RandomSpawner from "./random_spawner/random_spawner";
import useStore from "../../../store/store";
import { useShallow } from "zustand/shallow";
import check_undirected from "../../functions/check_undirected/check_undirected";
import check_weighted from "../../functions/check_weighted/check_weighted";
import Button from "../../../../utility/atoms/button/button";
import SpawnerModal from "./spawner_modal/spawner_modal";
import storage_get_graphs from "./functions/local_get_graphs";
import GraphSave from "./graph_save/graph_save";

const selector = (state: AppState) => ({
    setNodes: state.setNodes,
    setEdges: state.setEdges,
    setModifyMode: state.setModifyMode,
    setIsDirected: state.setIsDirected,
    setIsWeighted: state.setIsWeighted,
    edges: state.edges,
    nodes: state.nodes
});


/**
 * 
 * @returns Component used for spawning presets of graph
 * defined either by user (saved in local storage),
 * by spawning randomly or by selecting one of prepared
 * graph presets
 */
export default function GraphSpawner() {
    const { setNodes, setEdges, setModifyMode, setIsDirected, setIsWeighted, nodes, edges } = useStore(useShallow(selector));

    const [graphPresets, setGraphPresets] = useState([...graph_preset, ...storage_get_graphs()]);
    const [showRandom, setShowRandom] = useState(false);
    const reactFlow = useReactFlow();


    const fit_view = () => {
        reactFlow.fitView();
    }

    const changeGraph = (idx: number): void => {
        const chosen = graphPresets[idx];
        import.meta.env.DEV ? console.log(idx) : null;
        setEdges(chosen.edges);
        setNodes(chosen.nodes);
        // additional checks for state change
        if (check_weighted(chosen.edges)) {
            setIsWeighted(true);
        }
        else {
            setIsWeighted(false);
        }

        if (check_undirected(chosen.edges)) {
            setIsDirected(false);
        }
        else {
            setIsDirected(true);
        }
        setTimeout(fit_view);
        setModifyMode(true);
    }

    const onClick = () => {
        (document.getElementById('spawner_modal') as HTMLDialogElement).showModal();
    }

    const onRemove = (idx: number) => {
        const key = graphPresets[idx].name;
        localStorage.removeItem(key);
        setGraphPresets([...graphPresets.filter(g => g.name !== key)]);
    }

    return (
        <div className="px-5 py-2">
            <div className="pl-36 flex flex-row items-center justify-center">
                <Button onClick={onClick} text="Graphs" style="w-36 lg:w-72 m-2" />
                <GraphSave nodes={nodes} edges={edges} graphPresets={graphPresets} setGraphPresets={setGraphPresets} />
                <SpawnerModal setShowRandom={setShowRandom} onClose={changeGraph} graph_names={graphPresets} onRemove={onRemove} />
            </div>
            <div className="flex flex-col items-center justify-center">
                {showRandom ? <RandomSpawner /> : null}
            </div>
        </div>
    );
}