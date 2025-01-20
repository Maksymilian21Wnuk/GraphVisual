import { StructureInterface } from "../../../../../../shared/types/visualisation_types";
import Button from "../../../../../utility/atoms/button/button";
import code_parser from "./code_parser";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/light";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python'


// optimization !!
SyntaxHighlighter.registerLanguage("python", python);


export default function CodeRepresentation({ graph }: StructureInterface) {
    const code_repr = code_parser(graph);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code_repr);
    }

    return (
        <div>
            <div className="border-4">
                <SyntaxHighlighter language="python" style={docco} showLineNumbers wrapLines>
                    {code_repr}
                </SyntaxHighlighter>
            </div>
            <div className="m-2 pl-10">
                <Button text="Copy to clipboard" onClick={copyToClipboard} />
            </div>
        </div>
    )
}