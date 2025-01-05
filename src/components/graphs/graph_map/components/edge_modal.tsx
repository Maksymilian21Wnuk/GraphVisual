import { Edge } from "@xyflow/react";
import { forwardRef, useState } from "react";

// this component returns a popup whenever edge is clicked when
// its add mode and graph is weighted
// it allows to change edge's weight


interface EdgeModalInterface {
    updateEdge: (id: string, edgeUpdate: Partial<Edge> | ((edge: Edge) => Partial<Edge>), options?: { replace: boolean; } | undefined) => void;
    edge_to_change: Edge;
}

export const EdgeModal = forwardRef<HTMLDialogElement, EdgeModalInterface>(function EdgeModal(props, ref) {
    const [inputVal, setInputVal] = useState("");
    const { updateEdge, edge_to_change } = props;

    const onClick = () => {
        if (inputVal === "" || isNaN(parseInt(inputVal))) {
            alert("Value must be number")
        }
        else {
            updateEdge(edge_to_change.id, { label: String(Math.floor(parseInt(inputVal))) });
        }
        setInputVal("");
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value)
    }

    return (
        <dialog id="edge_modal" className="modal" ref={ref}>
            <div className="modal-box text-black">
                <p className="py-4">Weight: </p>
                <input value={inputVal} type="text" 
                    onChange={onChange} 
                    className="input border border-black"></input>
                <div className="modal-action">
                    <form method="dialog">
                        <button onClick={onClick} className="btn">Set</button>
                        <button className="btn">Exit</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
})