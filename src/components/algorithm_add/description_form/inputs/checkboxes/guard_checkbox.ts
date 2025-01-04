import { RequirementsInterface } from "../../util/input_interface";
import { CheckboxInputName } from "../../util/input_types";





/**
 * Function for guarding checkboxes for creation
 * of template of graph's requirements
 * @param name name of currently clicked checkbox
 * @param checked check boolean 
 * @param selections current value of selections
 * @returns properly guarded selection object
 */
export default function guard_checkbox(name: CheckboxInputName, checked: boolean, selections: RequirementsInterface): RequirementsInterface {
    // graph cannot be directed and tree or nondirected
    if (name === "require_directed" && (selections.require_non_directed || selections.require_tree)) {
        return { ...selections, require_directed: true, require_non_directed: false, require_tree: false };
    }
    // cant be tree and directed
    else if (name === "require_tree" && selections.require_directed) {
        return { ...selections, require_directed: false, require_tree: true };
    }
    // cant be nondirected and directed
    else if (name === "require_non_directed" && selections.require_directed) {
        return { ...selections, require_directed: false, require_non_directed: true };
    }
    // guard passed is fine
    else {
        return { ...selections, [name]: checked };
    }
}