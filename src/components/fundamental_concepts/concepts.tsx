import { useState } from "react"
import _concepts from "./concepts.json"

interface ConceptData {
    title: string;
    desc: string;
}

const concepts : ConceptData[] = _concepts;

export default function Concepts() {
    const [filterVal, setFilterVal] = useState<string>("");

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterVal(e.target.value);
    }

    return (
        <>
            <input onChange={handleFilterChange} placeholder="search" className="input border border-black"></input>
            <div className="divider"></div>
            <div className="grid grid-cols-1 w-screen md:grid-cols-3 text-xl px-2 md:px-12 mx-5">
                {concepts.map((d: ConceptData) =>
                    d.title.toLocaleLowerCase().includes(filterVal) ? 
                    (<li className="list-none" key={d.title}>
                        <div className="border-4 rounded-md m-2 p-2 bg-gray-50 hover:bg-gray-100">
                            <div className="font-semibold">
                                {d.title}
                            </div>
                            <div className="divider"></div>
                            <div className="">
                                {d.desc}
                            </div>
                        </div>
                    </li>) : null
                )}
            </div>
        </>
    )
}