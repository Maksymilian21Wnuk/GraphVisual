import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/light";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python'
import JsonGetter from "../../store/json_getter";
import { useMemo } from "react";

interface CodeModalInterface {
    selectedValue: string;
    hideCodeDesc: () => void;
}

// optimization !!
SyntaxHighlighter.registerLanguage("python", python);

export default function CodeModal({ selectedValue, hideCodeDesc }: CodeModalInterface) {
    const code_text: string[] = useMemo(() => {
        return JsonGetter.getCode(selectedValue);
    }, [selectedValue])

    return (
        <dialog id="code_modal" className="modal gray-out" open>
            <div className="modal-box w-11/12 max-w-2xl">
                <h1 className="h1-custom">
                    Code
                </h1>
                <SyntaxHighlighter language="python" style={docco} showLineNumbers>
                    {code_text.join("\n")}
                </SyntaxHighlighter>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn" onClick={hideCodeDesc}>Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}