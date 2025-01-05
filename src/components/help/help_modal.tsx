import { useRef } from "react";
import Legend from "../graphs/description/content/legend";
import Helper from "./icon_helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { ModalAtom } from "../utility/atoms/modal_atom/modal_atom";



export function HelpModal() {
    const ref = useRef<HTMLDialogElement>(null);

    function handleClick() {
        ref.current!.showModal();
    }

    return (
        <>
            <button className="text-xl font-bold" onClick={handleClick} >
                <FontAwesomeIcon icon={faCircleQuestion} />
            </button>
            <ModalAtom ref={ref}>
                <>
                    <div className="modal-box text-black">
                        <h3 className="font-bold text-lg">Help</h3>
                        <div className="py-4 text-sm">
                            <Helper />
                        </div>
                        <Legend />
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>Close</button>
                    </form>
                </>
            </ModalAtom>
        </>
    );

}