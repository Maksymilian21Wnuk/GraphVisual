import { FormCheckboxInterface } from "../input_interface"



export default function CheckboxAtom({ info, onChange, value}: FormCheckboxInterface) {
    return (
        <li key={info.name}>
            <label className="label">
                <span className="label-text text-3xl">{info.title}</span>
                <input 
                    onChange={onChange}
                    checked={value}
                    id={info.name}
                    name={info.name}
                    type="checkbox" 
                    className="checkbox checkbox-lg ml-10" />
            </label>
        </li>
    )
}