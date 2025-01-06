import { useState } from "react"
import Button from "../../../../../utility/atoms/button/button";
import Input from "../../input";
import Slider from "../../../../../utility/atoms/slider/slider";
import randomizer from "./randomizer";
import { AppState } from "../../../../../../shared/types/graph_map_types";
import useStore from "../../../../store/store";
import { useShallow } from "zustand/shallow";
import { useReactFlow } from "@xyflow/react";
import { NODE_MAX } from "../../../../../../shared/constants";



const selector = (state: AppState) => ({
    setNodes: state.setNodes,
    setEdges: state.setEdges,
    setIsDirected: state.setIsDirected,
    setIsWeighted: state.setIsWeighted,
});

const regex : RegExp = /^[0-9\b]+$/;

export default function RandomSpawner() {
    const { setNodes, setEdges, setIsDirected, setIsWeighted } = useStore(useShallow(selector));
    const [sliderValue, setSliderValue] = useState<number>(0.5);
    const [nodeCount, setNodeCount] = useState<string | number>(10);
    const reactFlow = useReactFlow();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(parseFloat(event.target.value));
    }

    const submitSpawn = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (typeof (sliderValue) === "number" && typeof (nodeCount) === "number" && nodeCount <= NODE_MAX) {
            const { edges, nodes } = randomizer(sliderValue, nodeCount);
            setIsDirected(false);
            setIsWeighted(false);
            setNodes(nodes);
            setEdges(edges);
            setTimeout(() => reactFlow.fitView());
        }
        else if (nodeCount as number > NODE_MAX) {
            alert("Too many nodes");
        }
        else {
            alert("Unhandled error");
        }
    }

    const input_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const count: string = event.target.value;

        if (count === '' || regex.test(count)) {
            const parsed: number = +count;
            if (parsed < 0) {
                setNodeCount(0);
            }
            else {
                setNodeCount(parsed);
            }
        }
        else{
            alert("Invalid value");
            setNodeCount("");
        }
    }

    // if user selected random option, give him form for 
    // generating random graph

    return (
        <div className="">
            <label>Edge probability</label>
            <Slider max="1" min={0} step="0.01" onChange={onChange} sliderValue={sliderValue} />
            <Input id={"nodeInput"} top_left_text="Node Count" input_change={input_change} input_value={nodeCount} />
            <Button onClick={submitSpawn} text="Spawn" />
        </div>
    )


}