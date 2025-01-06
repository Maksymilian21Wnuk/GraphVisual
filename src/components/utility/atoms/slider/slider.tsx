

interface SliderProps {
    sliderValue : number;
    onChange : (event: React.ChangeEvent<HTMLInputElement>) => void;
    step: string;
    max: string;
    min: number;
    disabled? : boolean;
}


export default function Slider({sliderValue, onChange, step, max, min, disabled} : SliderProps) {
    return (
        <div>
            <input type="range" disabled={disabled} step={step} min={min} max={max} value={sliderValue} 
            className="range disabled:bg-gray-400 [--range-shdw:#BEF264]" onChange={onChange} />
            <output>{sliderValue}</output>
        </div>
    )
}