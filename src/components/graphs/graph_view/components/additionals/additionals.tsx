import { Message } from "../../../../../shared/types/visualisation_types"
import AdditionalDisplay from "./additional_display";



export default function Additionals({ msg, additional, additional_name, modifyMode, additional_snd, additional_snd_name }: Message) {

    return (additional_name || msg) && !modifyMode ? (
        <div className="grid grid-cols-2 mx-2 p-2">
            {msg ?
                <div className="font-bold text-xl col-span-2"> 
                    {msg}
                </div> : null}
            <div>
                <div className="text-xs lg:text-xl">
                    {additional_name ? additional_name : null}
                </div>
                <div className="py-6">
                    {additional ? <AdditionalDisplay additional={additional} /> : null}
                </div>
            </div>

            <div>
                <div className="text-xs lg:text-xl">
                    {additional_snd_name ? additional_snd_name : null}
                </div>
                <div className="py-6 ">
                    {additional_snd ? <AdditionalDisplay additional={additional_snd} /> : null}
                </div>
            </div>
        </div>
    ) : null
}