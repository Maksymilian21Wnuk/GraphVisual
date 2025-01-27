import InfoFieldProps from "../../../shared/interfaces/info_field.interface"



export const fields : InfoFieldProps[] = [
    {
        title: "Graphs",
        content: `Graph is a structure consisting of nodes connected by edges.
        They are specifically used in analyzing the relationships between data, for example
        a friendship between people may be expressed as a form of graph,
        where edge between two people indicates that they know each other.`
    },
    {
        title: "Algorithms",
        content: `There are several algorithms available on this website, among them
        ones used for graph traversals, shortest paths finding, topological sorting or 
        checking properties such as bipartiness or connectivity.
        The visualisation is the best way of studying algorithms, that is
        why this application was created.`
    },
    {
        title: "Extending current set of algorithms",
        content: `Some algorithms might be missing on this page. There is an ability
        of extending the current set of algorithms. The API
        might seem difficult at first glance, but after studying provided examples, writing new visualisations
        will be effortless.`
    },
    {
        title: "Why use this page?",
        content: `This page offers user a highest quality interaction with fully responsive design.
        Ability of creating graph by adding and connecting nodes or assigning weights, creates
        best user experience, ready for examination of graph algorithms. Moreover, user is 
        able to spawn a graph with given probability. There is also a wide choice of pre-made graphs,
        for studying them with an improved experience.`
    },
    {
        title: "About page",
        content: `Page was made with usage of React and typescript. Interactive part
        of application is made thanks to ReactFlow, a customizable component
        library for building node-based editors and diagrams. Styling part was made
        in tailwind with component library daisyUI.`
    }
]