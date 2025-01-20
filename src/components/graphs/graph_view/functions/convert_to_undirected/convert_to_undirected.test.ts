import { Edge } from "@xyflow/react";
import { ARROW_SVG_ID, NO_ARROW } from "../../../../../shared/constants";
import convert_to_undirected from "./convert_to_undirected";


const empty : Edge[] = [];

const directed: Edge[] = [{ id: "1-2", source: "1", target: "2", label: 42, markerEnd: ARROW_SVG_ID }];
const directed_no_invariant : Edge[] = [{ id: "2-1", source: "2", target: "1", label: 42, markerEnd: ARROW_SVG_ID }]

const converted : Edge[] = [{ id: "1-2", source: "1", target: "2", label: 42, markerEnd: NO_ARROW }];;

describe("Conversion to undirected graph representation", () => {
    test(`Invariant holding conversion`, () => {
        expect(convert_to_undirected(directed)).toStrictEqual(converted);
    });

    test(`No invariant conversion`, () => {
        expect(convert_to_undirected(directed_no_invariant)).toStrictEqual(converted);
    });

    test(`Empty test`, () => {
        expect(convert_to_undirected(empty)).toStrictEqual([]);
    })
})