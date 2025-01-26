import { AggregationInterfaceNamed, DescriptionInterface, JsonRepresentation, JsonFields} from "../../../algorithms/algorithms_description/json_interfaces";
import { AlgorithmsMap } from "../../../algorithms/algorithms_description/algorithms_map";
import { GraphFunctionAbstract } from "../../../shared/types/visualisation_types";
import _description from "../../../algorithms/algorithms_description/description.json"



/**
 * Json getter class with static methods for
 * getting json data for steps, descriptions or code.
 * It also implements a way of parsing function name to
 * it's functional representation. Main reason for this - hide implementation
 * of getting json parsed.
 */
export default class JsonGetter {
    static description = _description as JsonRepresentation;

    static getSteps(name : string) : string[] {
        return JsonGetter.description[name][JsonFields.Steps];
    }

    static getCode(name : string) : string[] {
        return JsonGetter.description[name][JsonFields.Code];
    }

    static getDescription(name : string) : DescriptionInterface {
        return JsonGetter.description[name][JsonFields.Description];
    }
    
    static getAggregation(name : string) : AggregationInterfaceNamed {
        return {...JsonGetter.description[name][JsonFields.Aggregation], name: name};
    }

    static getAggregationFull() : AggregationInterfaceNamed[] {
        let agg : AggregationInterfaceNamed[] = [];
        for (let key in JsonGetter.description){
            agg.push({...JsonGetter.description[key][JsonFields.Aggregation], name: key})
        }
        return agg;
    }

    static parseAlgorithm(a : AggregationInterfaceNamed) : GraphFunctionAbstract {
        return AlgorithmsMap.get(a.name)!;
    }

}
