import { VisualisationAction } from "../../../../shared/types/visualisation_types";


/**
 * used for removing duplicates of consecutive dispatching
 * @param dispatch dispatch function
 * @param actions actions array to perform
 * @returns 
 */
export const action_creator = (dispatch: React.Dispatch<VisualisationAction>,
    actions: VisualisationAction[]) => actions.map((a: VisualisationAction) => dispatch(a))