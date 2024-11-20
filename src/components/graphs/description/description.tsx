import { useState } from 'react';
import { AppState } from '../../../shared/types/graph_map_types';
import useStore from '../store/store';
import { useShallow } from 'zustand/shallow';
import Button from '../../utility/atoms/button/button';
import CodeDesc from './content/code_desc';
import StepDesc from './content/step_desc';


const selector = (state: AppState) => ({
    algo_selected: state.selectedValue,
});


export default function Description() {
    const { algo_selected } = useStore(useShallow(selector));
    const [showCode, setShowCode] = useState(false);

    return (
        <>
            <div className="animate-appear w-1/5">
                {algo_selected !== "" ? (
                    <div className="flex flex-col justify-center items-center">
                        <div className='flex flex-col items-center'>
                            {import.meta.env.DEV ? <Button onClick={() => setShowCode(true)} text="See the code" style="" /> : null}
                            <StepDesc selectedValue={algo_selected} />
                            {showCode ?
                                <CodeDesc selectedValue={algo_selected} hideCodeDesc={() => setShowCode(false)} />
                                : null}
                        </div>
                    </div>) : null}
            </div>
        </>
    )
}