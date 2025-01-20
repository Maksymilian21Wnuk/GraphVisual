import { NODE_MAX } from "../../../../../shared/constants";
import find_first_free from "./find_first_free_index";
import { Node, XYPosition } from "@xyflow/react";

const basic_pos : XYPosition = {x: 0, y: 0}
const basic_label : Record<string, unknown> = {label : "1"}
const nodes1 : Node[] = [{id: "1", position: basic_pos, data: basic_label}]
const nodes2 : Node[] = [...nodes1, {id: "3", position: basic_pos, data : basic_label}]
const nodes3 : Node[] = [...nodes1, {id: "4", position: basic_pos, data : basic_label}]



let huge_nodes : Node[] = [];
for (let x = 1; x < NODE_MAX; x++) {
    huge_nodes.push({id: String(x), data: basic_label, position: basic_pos});
}

describe("First free index test", () => {
    test("No index, should return 1", () => {
        expect(find_first_free([]))
            .toStrictEqual("1")
    })
    test("Only one index test", () => {
        expect(find_first_free(nodes1))
            .toStrictEqual("2")
    })
    test("Index inbetween test", () => {
        expect(find_first_free(nodes2))
            .toStrictEqual("2")
    })
    test("Index in between gap", () => {
        expect(find_first_free(nodes3))
            .toStrictEqual("2")
    })
    test("Huge array test", () => {
        const start = performance.now();
        expect(find_first_free(huge_nodes))
            .toStrictEqual("30");
        const end = performance.now() - start;
        console.log(end);
        expect(end)
            .toBeLessThan(1);
        
        }

    )

}

)



