import JsonGetter from "../../../store/json_getter";



interface DescriptionModalInterface {
    onHide: () => void;
    title: string;
    chosen: string;
}


export default function DescriptionModal({ chosen, title, onHide }: DescriptionModalInterface) {
    const desc = JsonGetter.getDescription(chosen);

    return (
        <dialog id="description_modal" className="modal gray-out" open>
            <div className="modal-box text-black">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="h1-custom">
                        {title}
                    </h1>
                    <div className="p-2">
                        {desc.text}
                    </div>
                    <div className="p-1">
                        Time: {desc.time}
                    </div>
                    <div className="p-1">
                        Space: {desc.space}
                    </div>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button onClick={onHide} className="btn">Exit</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}