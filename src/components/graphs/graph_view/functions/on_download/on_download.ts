import { Edge, getViewportForBounds, Node, ReactFlowInstance } from "@xyflow/react";
import { toPng } from "html-to-image";
import { ImageSize } from "../../../../../shared/enumerations/enums";
import { DOWNLOAD_COUNTER_NAME } from "../../../../../shared/constants";


/**
 * On download click perform png
 * creation of given graph representation on 
 * viewport
 * @param nodes nodes for saving to png file
 * @returns saves file to user's device
 */
export default function onDownload(nodes: Node[], reactFlow: ReactFlowInstance<Node, Edge>) {
    const imageWidth = ImageSize.WIDTH;
    const imageHeight = ImageSize.HEIGHT;

    const nodesBounds = reactFlow.getNodesBounds(nodes);
    const viewport = getViewportForBounds(
        nodesBounds,
        imageWidth,
        imageHeight,
        0, 1.5,
        0.25,
    );

    const element: HTMLElement | null = document.querySelector('.react-flow__viewport');
    if (!element) {
        return
    }

    let counter : string | null = localStorage.getItem(DOWNLOAD_COUNTER_NAME);

    if (!counter) {
        // set item to 2, since counter is 1 and we are using this key
        localStorage.setItem(DOWNLOAD_COUNTER_NAME, "2");
        counter = "1";
    }
    else {
        localStorage.setItem(DOWNLOAD_COUNTER_NAME, String(parseInt(counter) + 1));
    }

    toPng(element, {
        backgroundColor: '#ffffff',
        width: imageWidth,
        height: imageHeight,
        style: {
            width: String(imageWidth),
            height: String(imageHeight),
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
    })
        .then((dataUrl: string) => {
            const link = document.createElement('a');
            link.download = `graph${counter}.png`;
            link.href = dataUrl;
            link.click();
        })
        .catch((err: Error) => {
            console.log('Error downloading image', err);
        });
}