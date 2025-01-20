

interface GeneratedVal {
    id : string
    source : string;
    target : string;
}


export default function generate_ids(n: number, probability : number) : GeneratedVal[] {
    let ids : GeneratedVal[] = [];
    for (let i = 1; i <= n; i++) {
        for (let j = i + 1; j <= n; j++) {
            if (Math.random() <= probability){
                ids.push({id : `${i}-${j}`, source: String(i), target: String(j)});
            }
        }
    }
    return ids;
}
