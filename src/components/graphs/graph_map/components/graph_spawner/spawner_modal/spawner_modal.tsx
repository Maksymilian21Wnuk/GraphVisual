import { useState } from "react";
import { GraphName } from "../../../../../../shared/types/graph_map_types"


interface SpawnerModalInterface {
    graph_names: GraphName[];
    onClose: (idx : number) => void;
    setShowRandom: (b : boolean) => void;
}


export default function SpawnerModal({ graph_names, onClose, setShowRandom }: SpawnerModalInterface) {

    const [localIdx, setLocalIdx] = useState(0);


    const onClick = () => {
        if (localIdx === -1) {
            setShowRandom(true);        }
        else{
            onClose(localIdx);
            setShowRandom(false);
        }
    }

    return (
        <dialog id="spawner_modal" className="modal">
            <div className="modal-box text-black">
                <div className="flex items-center justify-center flex-col">
                    <h1 className="font-bold text-xl py-2">
                        Choose graph to spawn
                    </h1>
                    <ul className="">
                        {graph_names.map((n: GraphName, idx : number = -1) =>
                            <li onClick={() => setLocalIdx(idx++)} className="py-1 border-2 hover:bg-gray-200 cursor-pointer active:bg-red-500">
                                {n.name}
                            </li>
                        )}
                    </ul>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button onClick={onClick} className="btn">Spawn</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}