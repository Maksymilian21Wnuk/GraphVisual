import { Edge } from "@xyflow/react";
import check_undirected from "./check_undirected";
import { ARROW_SVG_ID } from "../../../../../shared/constants";

const empty : Edge[] = [];
const undirected_edges: Edge[] = [{ id: "1-2", source: "1", target: "2", label: 42 }];
const directed_edges: Edge[] = [{ id: "1-2", source: "1", target: "2", label: 42, markerEnd: ARROW_SVG_ID }];


describe("Check undirected test suite", () => {
    test(`Empty edges test`, () => {
        expect(check_undirected(empty)).toBe(true);
    })

    test(`Should return undirected true`, () => {
        expect(check_undirected(undirected_edges)).toBe(true);
    })

    test(`Should return directed false`, () => {
        expect(check_undirected(directed_edges)).toBe(false);
    })
})