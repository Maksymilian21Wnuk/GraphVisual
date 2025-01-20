import { faWeightHanging } from "@fortawesome/free-solid-svg-icons/faWeightHanging";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ControlButton } from "@xyflow/react";
import { ActionType } from "../../../../shared/enumerations/enums";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons/faShareNodes";
import { faHand } from "@fortawesome/free-solid-svg-icons/faHand";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { AdditionalControls } from "./controls_interface";
import { AppState } from "../../../../shared/types/graph_map_types";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../store/store";




const selector = (state: AppState) => ({
    isDirected: state.isDirected,
    isWeighted: state.isWeighted,
});

export default function CollapsibleControls({ onDownload, randomizeWeight, clearGraph, dispatch, noWeights, setIsDirected, chosen, currentMode, setCurrentMode }: AdditionalControls) {
    const { isDirected, isWeighted } = useStore(useShallow(selector));

    return (
        <>
            <ControlButton title="Weighted graph"
                style={{ "background": isWeighted ? "rgb(163 230 53)" : "white" }}
                onClick={isWeighted ? noWeights : randomizeWeight}
            >
                <FontAwesomeIcon icon={faWeightHanging} />
            </ControlButton>
            <ControlButton
                title="Set directed graph"
                onClick={setIsDirected}
                style={{ "background": isDirected ? "rgb(163 230 53)" : "white" }}
            >
                <FontAwesomeIcon icon={faArrowRight} />
            </ControlButton>
            <ControlButton
                style={{ "background": currentMode === ActionType.MODE_ADD ? "rgb(163 230 53)" : "white" }}
                title="Add mode"
                onClick={() => {
                    dispatch({ type: ActionType.MODE_ADD });
                    setCurrentMode(ActionType.MODE_ADD)
                }}>
                <FontAwesomeIcon icon={faShareNodes} />
            </ControlButton >
            <ControlButton
                style={{ "background": currentMode === ActionType.MODE_CHOOSE ? "rgb(163 230 53)" : "white" }}
                title="Choose mode"
                onClick={() => {
                    dispatch({ type: ActionType.MODE_CHOOSE });
                    setCurrentMode(ActionType.MODE_CHOOSE)
                }}>
                <FontAwesomeIcon icon={faHand} />
            </ControlButton>
            <ControlButton
                style={{ "background": currentMode === ActionType.MODE_REMOVE ? "rgb(163 230 53)" : "white" }}
                title="Remove mode"
                onClick={() => {
                    dispatch({ type: ActionType.MODE_REMOVE });
                    setCurrentMode(ActionType.MODE_REMOVE)
                }}>
                <FontAwesomeIcon icon={faTrash} />
            </ControlButton>
            <ControlButton title="Clear graph" onClick={clearGraph}>
                <FontAwesomeIcon icon={faX} />
            </ControlButton>
            {import.meta.env.DEV ? <ControlButton title="Download image" onClick={onDownload}>
                <FontAwesomeIcon icon={faDownload} />
            </ControlButton> : null}
            <ControlButton title="Chosen vertice to connect"
                onClick={() => currentMode === ActionType.MODE_ADD ? dispatch({ type: ActionType.RESET }) : null}>
                {chosen}
            </ControlButton>
        </>)
}