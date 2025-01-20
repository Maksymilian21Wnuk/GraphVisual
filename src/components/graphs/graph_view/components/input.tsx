

interface InputProps {
    top_left_text : string;
    input_change : (n : React.ChangeEvent<HTMLInputElement>) => void;
    input_value : number | string;
    id : string;
}


export default function Input({top_left_text, input_change, input_value, id} : InputProps) {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text-alt">{top_left_text}</span>
            </div>
            <input type="number" 
                id={id}
                className="input input-bordered w-full max-w-xs" 
                value={input_value}
                onChange={input_change}/>
        </label>
    );
}