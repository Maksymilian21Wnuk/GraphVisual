import { Controls, ControlButton } from "@xyflow/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ActionType } from "../../../../shared/enumerations/enums";
import { CustomControlsProps } from "./controls_interface";
import CollapsibleControls from "./collapsible_controls";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";

/*
file for setting custom controls
on graph map, as a props takes
functions that will be called on click,
should be fontawesomeicon
it contains additional controls
displayed by default, but hidden 
on hidden state change
*/
export default function CustomControls({ onDownload, onFitView, randomizeWeight, clearGraph, dispatch, noWeights, setIsDirected, chosen }: CustomControlsProps) {
    const [hidden, setHidden] = useState(false);
    const [currentMode, setCurrentMode] = useState(ActionType.MODE_CHOOSE);

    const onHiddenClick = () => {
        setHidden(!hidden);
    }

    return (
        <Controls position="top-right" showInteractive={false} showZoom={false} onFitView={onFitView}>
            <ControlButton title="Hide panel" onClick={onHiddenClick}>
                <FontAwesomeIcon icon={hidden ? faPlus : faMinus} />
            </ControlButton>
            {hidden ?
                null :
                <CollapsibleControls
                    chosen={chosen}
                    onDownload={onDownload} randomizeWeight={randomizeWeight}
                    clearGraph={clearGraph} dispatch={dispatch}
                    noWeights={noWeights} setIsDirected={setIsDirected}
                    setCurrentMode={setCurrentMode} currentMode={currentMode} />}
        </Controls>
    )
}