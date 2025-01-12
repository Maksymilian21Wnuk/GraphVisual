import { useState } from "react";
import Elements from "./elements";
import JsonGetter from "../../../store/json_getter";
import { AggregationInterfaceNamed } from "../../../../../algorithms/algorithms_description/json_interfaces";

interface DropdownProps {
    setSelectedValue: (n: string) => void;
    setChosenFunction: (chosen_function: AggregationInterfaceNamed) => void;
    resetGraph: () => void;
};

const algorithm_list = JsonGetter.getAggregationFull();

export default function AlgorithmList({ setSelectedValue, setChosenFunction, resetGraph }: DropdownProps) {
    const [filterVal, setFilterVal] = useState("");


    const handleChange = (chosen : string) => {
        // for now disabled
        //document.getElementById("navbar")?.scrollIntoView({ behavior: 'smooth' });
        setSelectedValue(chosen);
        setChosenFunction(JsonGetter.getAggregation(chosen));
        resetGraph();
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterVal(e.target.value);
    }

    return (
        <div className="flex flex-col items-center content-center pb-12 bg-slate-50 border-2">
            <div className="grid grid-cols-2 p-4">
                <h1 className="text-2xl font-bold">Algorithms</h1>
                <input onChange={handleFilterChange} placeholder="filter" className="input border border-black"></input>
            </div>
            <div className="lg:w-3/5 overflow-auto h-[400px]">
                <Elements onClick={handleChange} 
                algos={algorithm_list} 
                filterVal={filterVal} />
            </div>

        </div>
    );
}