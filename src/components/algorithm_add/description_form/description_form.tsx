import { FormEvent, useState } from "react"
import OneLineInput from "./inputs/one_line_input/one_line_input";
import { RequirementsInterface, InputInterface, OutputInterface } from "./util/input_interface";
import LargeInput from "./inputs/large_input/large_input";
import CodeInput from "./inputs/code_input/code_input";
import submit_guard from "./util/submit_guard";
import submit_json_parse from "./util/submit_json_parse";
import CheckBoxes from "./inputs/checkboxes/checkboxes";
import guard_checkbox from "./inputs/checkboxes/guard_checkbox";
import { CheckboxInputName } from "./util/input_types";
import { JsonRepresentation } from "../../../algorithms/algorithms_description/json_interfaces";
import { checkboxes, code_info, exampleOutput, initialOutput, large_info, one_line_info } from "./store/infos";

interface DescriptionFormInterface {
    setTemplateJson: (repr: JsonRepresentation | null) => void
}

export default function DescriptionForm({ setTemplateJson }: DescriptionFormInterface) {
    const [showExample, setExampleShow] = useState(false);

    const [output, setOutput] = useState<OutputInterface>(initialOutput);

    const [requirements, setRequirements] = useState<RequirementsInterface>(
        {
            require_directed: false,
            require_non_directed: false,
            require_weights: false,
            require_tree: false
        }
    );

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setRequirements(guard_checkbox(name as CheckboxInputName, checked, requirements));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setOutput(
            {
                ...output,
                [name]: value
            }
        )
    }


    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const guard_res = submit_guard(output);
        if (guard_res.pass) {
            const res = submit_json_parse(output, requirements);
            setTemplateJson(res);
        }
        else {
            setTemplateJson(null)
            alert(guard_res.text!);
        }
    }

    const onExampleShow = () => {
        if (showExample) {
            setExampleShow(false);
            setOutput(initialOutput);
        }
        else {
            setExampleShow(true);
            setOutput(exampleOutput)
        }
    }

    return (
        <div className="bg-gray-200 m-5 lg:text-xl rounded-md">
            <div className="grid grid-cols-3">
                <h1 className="h1-custom col-span-2"> Step 2: Template generation </h1>
                <button className="btn m-2" onClick={onExampleShow}>
                    {showExample ? "Clear" : "See example"}
                </button>
            </div>
            <div className="bg-white">
                <form onSubmit={onSubmit}>
                    <ul>
                        {one_line_info.map((info: InputInterface, idx: number) =>
                            <li key={info.title}>
                                <OneLineInput input_info={info} bg={idx % 2} onChange={handleChange} value={output[info.name]} />
                            </li>
                        )}
                        {large_info.map((info: InputInterface, idx: number) =>
                            <li key={info.title} >
                                <LargeInput input_info={info} bg={(idx + 1) % 2} onChange={handleChange} value={output[info.name]} />
                            </li>
                        )}
                        {code_info.map((info: InputInterface, idx: number) =>
                            <li key={info.title} >
                                <CodeInput input_info={info} bg={(idx + 1) % 2} onChange={handleChange} value={output[info.name]} />
                            </li>
                        )}
                        <li key="checkbox" >
                            <CheckBoxes checkboxes={checkboxes} handleCheckbox={handleCheckbox} requirements={requirements} />
                        </li>
                    </ul>
                    <div className="justify-center items-center flex">
                        <button className="btn btn-lg m-2" type="submit">
                            Generate Template
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}