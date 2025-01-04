import { faQuestion } from "@fortawesome/free-solid-svg-icons/faQuestion";
import { FormInputInterface } from "../../util/input_interface";
import IconTooltip from "../../../../utility/atoms/icon_tooltip/icon_tooltip";



export default function OneLineInput({ input_info, bg, onChange, value }: FormInputInterface) {
    return (
        <div className={`p-5 ${bg ? "bg-slate-200" : "bg-slate-100"} grid grid-cols-9`}>
            <label className="mr-5 col-span-2" >{`${input_info.title}: `}</label>
            <input
                onChange={onChange}
                id={input_info.name}
                name={input_info.name}
                value={value}
                className="input lg:text-xl col-span-6"></input>
            <IconTooltip text={input_info.desc} icon={faQuestion} />
        </div>
    )
}