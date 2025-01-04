import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/light";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import { JsonRepresentation } from "../../../../../algorithms/algorithms_description/json_interfaces";
import { code_example, text_example } from "./string_templates";



interface MapEntryStepInterface {
    json: JsonRepresentation;
}

SyntaxHighlighter.registerLanguage("typescript", typescript);


export default function MapEntryStep({ json }: MapEntryStepInterface) {
    const algo_name = Object.keys(json)[0];

    return (
        <div className="">
            <div className="text-2xl p-2 m-4">
                {text_example(algo_name)}
            </div>
            <SyntaxHighlighter language="typescript" style={docco} showLineNumbers>
                {code_example(algo_name)}
            </SyntaxHighlighter>
        </div>
    )
}