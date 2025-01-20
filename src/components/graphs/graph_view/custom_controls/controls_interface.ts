import { ActionType } from "../../../../shared/enumerations/enums";
import { GraphAction } from "../../../../shared/types/graph_map_types";

interface ControlsInterface {
    randomizeWeight: () => void;
    clearGraph: () => void;
    dispatch: React.Dispatch<GraphAction>;
    noWeights: () => void;
    setIsDirected: () => void;
    onDownload: () => void;
    chosen: number;
}

export interface AdditionalControls extends ControlsInterface {
    currentMode: ActionType;
    setCurrentMode: (a: ActionType) => void;
}

export interface CustomControlsProps extends ControlsInterface {
    onFitView: () => void;
}