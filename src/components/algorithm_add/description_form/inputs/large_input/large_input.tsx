import { faQuestion } from "@fortawesome/free-solid-svg-icons/faQuestion";
import { FormInputInterface } from "../../util/input_interface";
import IconTooltip from "../../../../utility/atoms/icon_tooltip/icon_tooltip";





export default function LargeInput({ input_info, bg, onChange, value }: FormInputInterface) {
    return (
        <div>
            <div className={`p-5 ${bg ? "bg-slate-200" : "bg-slate-100"} grid grid-cols-9`}>
                <label className="mr-5 col-span-2" >{`${input_info.title}: `}</label>
                <textarea
                    onChange={onChange}
                    id={input_info.name}
                    name={input_info.name}
                    value={value}
                    placeholder={input_info.placeholder ? input_info.placeholder : ""}
                    className="textarea h-72 lg:text-xl col-span-6"></textarea>
                <IconTooltip text={input_info.desc} icon={faQuestion} />
            </div>
        </div>
    )
}