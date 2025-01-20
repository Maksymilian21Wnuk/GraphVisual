import { Steps, VisualisationAction, VisualisationEvaluated, VisualisationState } from "../../../../shared/types/visualisation_types";
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
        case VisualisationActionType.SET_STEP_IDX:
            return { ...state, step_idx: action.payload as number }

        case VisualisationActionType.SET_CHOSEN_FUNCTION:
            return { ...state, chosen_function: action.payload as AggregationInterfaceNamed }

        case VisualisationActionType.SET_STEPS:
            return { ...state, steps: action.payload as Steps }

        case VisualisationActionType.SET_EVALUATED_ARRAY: 
            return { ...state, evaluated_array: action.payload as VisualisationEvaluated[]}
        
        default:
            return state;
    }

}
