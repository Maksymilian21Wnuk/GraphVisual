import { DOWNLOAD_COUNTER_NAME } from "../../../../../../shared/constants";
import { GraphName } from "../../../../../../shared/types/graph_map_types";




export default function local_storage_get_names() : GraphName[] {
    let graph_names : GraphName[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const value = localStorage.key(i)!;
        // skip case when key is download counter...
        if (value === DOWNLOAD_COUNTER_NAME){
            continue
        }
        else{
            graph_names.push({name : value});
        }
    }

    return graph_names;
}