import { PreviousStep, Steps, VisualisationAction, VisualisationState } from "../../../../shared/types/visualisation_types";
import { VisualisationActionType } from "../../../../shared/enumerations/enums";
import { AggregationInterfaceNamed } from "../../../../algorithms/algorithms_description/json_interfaces";



/**
 * Reducer for storing the state
 * of visualisation component
 * @param state 
 * @param action 
 * @returns 
 */
export default function reducer(state: VisualisationState, action: VisualisationAction): VisualisationState {
    switch (action.type) {
        case VisualisationActionType.SET_FIRST_PREV:
            return { ...state, first_prev: action.payload as boolean }

        case VisualisationActionType.SET_STEP_IDX:
            return { ...state, step_idx: action.payload as number }

        case VisualisationActionType.SET_PREV_STEP:
            if (action.payload === undefined) {
                return { ...state, prev_step: undefined }
            }
            return { ...state, prev_step: action.payload as PreviousStep }

        case VisualisationActionType.SET_CHOSEN_FUNCTION:
            return { ...state, chosen_function: action.payload as AggregationInterfaceNamed }

        case VisualisationActionType.SET_STEPS:
            return { ...state, steps: action.payload as Steps }

        default:
            return state;
    }

}
