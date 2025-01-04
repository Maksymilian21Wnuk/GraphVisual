import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconTooltipInterface {
    text: string;
    icon: IconDefinition;
}

export default function IconTooltip({ text, icon }: IconTooltipInterface) {
    return (
        <div className="tooltip col-span-1" data-tip={text}>
            <button className="p-5 ml-5 bg-white rounded-3xl hover:bg-slate-100 cursor-default"
                onClick={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}>
                <FontAwesomeIcon icon={icon} />
            </button>
        </div>
    )
}