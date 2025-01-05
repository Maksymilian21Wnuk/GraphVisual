import { useState } from "react";
import { AggregationInterfaceNamed } from "../../../../../algorithms/algorithms_description/json_interfaces";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import DescriptionModal from "./description_modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChipsTypes from "./chips_types";

interface ElementsProps {
    onClick: (event: any) => void;
    algos: AggregationInterfaceNamed[];
    filterVal: string;
}

// on click sets to idx chosen value
export default function Elements({ onClick, algos, filterVal }: ElementsProps) {
    const [chosen, setChosen] = useState<string>("bfs");
    const [title, setTitle] = useState<string>("bfs");
    const [showModal, setShowModal] = useState(false);

    // required stop propagation to not trigger li
    const onShowPopup = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>, chosen: string, title: string) => {
        event.stopPropagation();
        setChosen(chosen);
        setShowModal(true);
        setTitle(title);
    }

    const onHide = () => {
        setShowModal(false);
    }

    

    return (
        <ul>
            {showModal ? <DescriptionModal title={title!} chosen={chosen!} onHide={onHide} /> : null}
            {algos.map((a: AggregationInterfaceNamed) => {
                if (a.title.toLocaleLowerCase().includes(filterVal)) {
                    return (
                        <li key={a.title}
                            onClick={() => onClick(a.name)}
                            className="grid grid-cols-11 gap-x-10 
                            cursor-pointer rounded-xl border-2 mb-2 
                            bg-white hover:bg-gray-100 h-28">
                            <div className="col-span-2 font-bold border-r-2 p-5">
                                {a.title}
                            </div>
                            <div className="col-span-6 p-5">
                                {a.description}
                            </div>
                            <div className="col-span-2 p-0.5">
                                <ChipsTypes require_directed={a.require_directed} require_non_directed={a.require_non_directed} require_tree={a.require_tree} require_weights={a.require_weights} />
                            </div>
                            <div className="col-span-1 py-4">
                                <button className="font-bold bg-slate-200 hover:bg-slate-300 p-5 px-6 rounded-full text-black" onClick={(e) => onShowPopup(e, a.name, a.title)}>
                                    <FontAwesomeIcon icon={faInfo} />
                                </button>
                            </div>
                        </li>)
                }
            }
            )}
        </ul>);

}