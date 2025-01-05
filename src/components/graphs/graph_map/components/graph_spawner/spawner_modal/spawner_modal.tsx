import { useRef, useState } from "react";
import { GraphName } from "../../../../../../shared/types/graph_map_types"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graph_preset } from "../preset/graph_preset";
import { ModalAtom } from "../../../../../utility/atoms/modal_atom/modal_atom";
import Button from "../../../../../utility/atoms/button/button";

interface SpawnerModalInterface {
    graph_names: GraphName[];
    onClose: (idx: number) => void;
    setShowRandom: (b: boolean) => void;
    onRemove: (idx: number) => void;
}


const preset_length = graph_preset.length;

export default function SpawnerModal({ graph_names, onClose, setShowRandom, onRemove }: SpawnerModalInterface) {

    const [localIdx, setLocalIdx] = useState(-1);
    const ref = useRef<HTMLDialogElement>(null);

    const onClick = () => {
        if (localIdx === -1) {
            setShowRandom(false);
        }
        else if (localIdx === 0) {
            setShowRandom(true);
            onClose(localIdx)
        }
        else {
            onClose(localIdx);
            setShowRandom(false);
        }
    }

    const showModal = () => ref.current!.showModal();

    return (
        <>
            <Button onClick={showModal} text="Graphs" style="w-36 lg:w-72 m-2" />
            <ModalAtom ref={ref}>
                <div className="modal-box text-black">
                    <div className="flex items-center justify-center flex-col">
                        <h1 className="font-bold text-xl py-2">
                            Choose graph to spawn
                        </h1>
                        <div className="overflow-y-auto h-[350px] w-full">
                            <ul className="">
                                {graph_names.map((n: GraphName, idx: number) =>
                                    <div key={"li-div" + idx} className="grid grid-cols-5">
                                        <li key={idx}
                                            onClick={() => { setLocalIdx(idx) }}
                                            className={
                                                (idx === localIdx ?
                                                    "p-2 col-span-4 m-2 border-2 rounded hover:bg-lime-400 bg-lime-300"
                                                    :
                                                    "p-2 m-2 col-span-4 border-2 rounded hover:bg-lime-100 cursor-pointer")}>
                                            {n.name}
                                        </li>
                                        {idx < preset_length ? null :
                                            <li key={"trash" + idx} title="Remove" onClick={() => onRemove(idx)}
                                                className="cursor-pointer p-5 w-10 h-10">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </li>
                                        }
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={onClick} className="btn">Spawn</button>
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </ModalAtom>
        </>
    )
}