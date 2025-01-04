import CheckboxAtom from "./checkbox_atom"
import { faQuestion } from "@fortawesome/free-solid-svg-icons/faQuestion"
import { CheckboxInputInterface, RequirementsInterface } from "../../util/input_interface"
import IconTooltip from "../../../../utility/atoms/icon_tooltip/icon_tooltip";


interface CheckboxesGroupInterface {
    checkboxes: CheckboxInputInterface[];
    requirements: RequirementsInterface;
    handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const text = `Requirements for visualisation. 
If the visualisation works for both directed and undirected graphs, leave those fields unticked.`;


export default function CheckBoxes({ checkboxes, requirements, handleCheckbox }: CheckboxesGroupInterface) {

    return (
        <div className="bg-slate-100 grid grid-cols-9">
            <div className="p-5 col-span-8">
                <ul className="flex flex-row justify-between items-center">
                    {checkboxes.map((c: CheckboxInputInterface) =>
                        <li key={c.name}>
                            <CheckboxAtom info={c} value={requirements[c.name]} onChange={handleCheckbox} />
                        </li>
                    )}
                </ul>
            </div>
            <IconTooltip text={text} icon={faQuestion} />
        </div>
    )
}