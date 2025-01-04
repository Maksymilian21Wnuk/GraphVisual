import { Node } from "@xyflow/react";



export default function get_currently_clicked(nodes : Node[]) : string{
    const n : Node = nodes.find((n : Node) => n.selected)!;
    if (n){
        return n.id;
    }
    else{
        return "1";
    }

}