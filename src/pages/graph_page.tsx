import Description from "../components/graphs/description/description"
import GraphSpawner from "../components/graphs/graph_map/components/graph_spawner/graph_spawner"
import GraphView from "../components/graphs/graph_map/graph_view"
import Visualisation from "../components/graphs/visualisation/visualisation"
import { ReactFlowProvider } from "@xyflow/react"
import { useWindowWidth } from "@react-hook/window-size"
import { PORTRAIT_MIN_WIDTH } from "../shared/constants"

export default function GraphVisualisationPage() {
    const width = useWindowWidth();

    if (width < PORTRAIT_MIN_WIDTH) {
        return (
            <div className="animate-appear min-h-screen">
                <h1 className="flex h1-custom items-center" >
                    Rotate device for the best experience
                </h1>
            </div>)
    }
    else {
        return (
            <div className="animate-appear min-h-screen">
                <ReactFlowProvider>
                    <GraphSpawner />
                    <div className="flex justify-center">
                        <Description />
                        <GraphView />
                    </div>
                    <Visualisation />
                </ReactFlowProvider>
            </div>
        )
    }
}