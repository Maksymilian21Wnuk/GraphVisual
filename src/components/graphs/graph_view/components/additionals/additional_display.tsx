import { Additional } from "../../../../../shared/types/visualisation_types";

interface AdditionalProps {
    additional: Additional[];
}


export default function AdditionalDisplay({ additional }: AdditionalProps) {

    return (
        <div className="h-full overflow-auto">
            <ul className="overflow-auto h-[200px] lg:h-[300px]">
                {additional.map((additional: Additional) => 
                <li key={additional.id} className="text-xs lg:text-lg animate-appear border lg:border-2 m-1 px-2 lg:px-3 py-1 w-fit border-black">
                    {additional.id}   {additional.value === String(Infinity) ? "∞" : additional.value}
                </li>)}
            </ul>
        </div>
    )
}