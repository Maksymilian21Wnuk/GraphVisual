import { forwardRef } from "react";

interface ModalProps {
    children: React.JSX.Element;
}


export const ModalAtom = forwardRef<HTMLDialogElement, ModalProps>(function ModalAtom(props, ref) {
    const {children} = props;

    return (
        <dialog id="help_modal" className="modal" ref={ref}>
            {children}
        </dialog>
    );
}
)