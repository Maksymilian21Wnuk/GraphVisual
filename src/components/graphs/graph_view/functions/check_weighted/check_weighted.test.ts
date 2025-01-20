import { Edge } from "@xyflow/react";
import { ARROW_SVG_ID, NO_WEIGHT } from "../../../../../shared/constants";
import check_weighted from "./check_weighted";

const empty : Edge[] = [];
const unweighted: Edge[] = [{ id: "1-2", source: "1", target: "2", label: NO_WEIGHT }];
const unweighted2: Edge[] = [{ id: "1-2", source: "1", target: "2" }];

const weighted: Edge[] = [{ id: "1-2", source: "1", target: "2", label: 42, markerEnd: ARROW_SVG_ID }];


describe("Check if graph is weighted suite", () => {
    test(`Empty edges test`, () => {
        expect(check_weighted(empty)).toBe(true);
    })

    test(`Unweighted test 1 label no weight`, () => {
        expect(check_weighted(unweighted)).toBe(false);
    })

    test(`Unweighted test 2 label is undefined`, () => {
        expect(check_weighted(unweighted2)).toBe(false);
    })

    test(`Weighted test check`, () => {
        expect(check_weighted(weighted)).toBe(true);
    })
})