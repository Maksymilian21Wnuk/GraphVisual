import { EdgeColor } from "../../../../../shared/enumerations/enums";


export default function CustomMarker() {
    return (
        <svg style={{top: 0, left: 0, width: 0, height: 0 }}>
            <defs>
                <marker
                    id="custom_arrow"
                    markerWidth="40"
                    markerHeight="40"
                    viewBox="-10 -10 20 20"
                    markerUnits="strokeWidth"
                    orient="auto-start-reverse"
                    refX="13"
                    refY="0"
                    style={{
                        position: "static"
                    }}
                >
                    <polyline
                        style={{
                            stroke: "black",
                            fill: "black",
                            strokeWidth: 1,
                        }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="-5,-4 0,0 -5,4 -5,-4"
                    />
                </marker>
            </defs>
            {/* invisible arrow for distinction of undirected and directed with invisible arrow */}
            <defs>
                <marker
                    id="invisible_arrow"
                    markerWidth="40"
                    markerHeight="40"
                    viewBox="-10 -10 20 20"
                    markerUnits="strokeWidth"
                    orient="auto-start-reverse"
                    refX="13"
                    refY="0"
                    style={{
                        position: "static"
                    }}
                >
                    <polyline
                        style={{
                            stroke: "black",
                            fill: "black",
                            strokeWidth: 1,
                            opacity: 0,
                        }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="-5,-4 0,0 -5,4 -5,-4"
                    />
                </marker>
            </defs>
            <defs>
                <marker
                    id="red_arrow"
                    markerWidth="40"
                    markerHeight="40"
                    viewBox="-10 -10 20 20"
                    markerUnits="strokeWidth"
                    orient="auto-start-reverse"
                    refX="13"
                    refY="0"
                    style={{
                        position: "static"
                    }}
                >
                    <polyline
                        style={{
                            stroke: EdgeColor.CURRENT,
                            fill: EdgeColor.CURRENT,
                            strokeWidth: 1,
                        }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="-5,-4 0,0 -5,4 -5,-4"
                    />
                </marker>
            </defs>
            <defs>
                <marker
                    id="yellow_arrow"
                    markerWidth="40"
                    markerHeight="40"
                    viewBox="-10 -10 20 20"
                    markerUnits="strokeWidth"
                    orient="auto-start-reverse"
                    refX="13"
                    refY="0"
                    style={{
                        position: "static"
                    }}
                >
                    <polyline
                        style={{
                            stroke: EdgeColor.VISITED,
                            fill: EdgeColor.VISITED,
                            strokeWidth: 1,
                        }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="-5,-4 0,0 -5,4 -5,-4"
                    />
                </marker>
            </defs>
        </svg>
        
    )
}