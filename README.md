# Interactive graph algorithms visualisation


# Table of contents
1. [About](#about)
2. [Starting application](#starting-application)
    1. [Docker](#docker)
    2. [Npm](#npm)
3. [Functionality](#functionality)
    1. [Interactive part](#interactive-part)
    2. [Visualisation](#visualisation)
        1. [Steps](#steps)
        2. [Writing algorithms](#writing-algorithms)
4. [Implementation](#implementation)

## About <a name="about"></a>
Interactive graph algorithms visualisation is an app created in 
react with typescript, that aims to provide a simple way of implementing visualisations performed on user created graphs. The graphs are created in an application's interface, and currently allows user to create various graphs with properties such as edges' directions or weights.


## Starting application <a name="starting-application"></a>

Clone in git cli and go to repo:
```bash
git clone https://github.com/Maksymilian21Wnuk/GraphVisual.git && cd GraphVisual
```
### Docker <a name="docker"></a>
1. Run command when in repo folder:
```bash
docker compose up
```
2. Go to localhost:3000/GraphVisual in browser.
3. You may stop docker compose with Ctrl+C
or
```bash
docker compose down
```
### Npm <a name="npm"></a>
1. When in repo folder run in cli for dev build:
```bash
npm run dev
```
2. Go to localhost:3000/GraphVisual in browser or when in cli
use o+Enter.
3. For prod build:
```bash
npm run build
npm run preview
```
4. Go to localhost:4173/GraphVisual in browser or when in cli
use o+Enter.

## Functionality <a name="functionality"></a>

This is divided into two main parts,
interactive which corresponds to graph creation, and visualisation that is more about how algorithms are visualised on given graph.

### Interactive part <a name="interactive-part"></a>

1. Graph Panel:
    1. Spawning nodes on panel click, maintaining correct labeling of node.
    2. Connecting edges, saving state of boolean that determines if graph is weighted or directed. Correctly handle adding edges when new weighted or directed edge is added.
    3. Removing node, correctly handle removing edges related to removed node.
    4. Making graph directed by randomly assigning directions of edges.
    5. Making graph weighted by randomly assigning
    weights to graph or removing weights.
    6. Clearing graph by removing all nodes and edges.
    7. Assigning specific weight on edge click.

2. Graph structure representation:
    1. Adjacency list representation.
    2. Matrix representation.
    3. Representation of graph's structure in python with copying it to clipboard.
    4. Hiding popup for examination of graph being represented

3. Graph presets:
    1. Saving graph to local storage:
        1. Graph's name as a key
        2. Nodes and edges of graph as values
        3. If name is the same, update graph in local storage
        4. Proper saving of graph, during graph coloring/visualisation we need to save correct, that is resetted version of graph
        5. Maintaining weights and directions on save
    2. Loading from local storage or hardcoded graphs:
        1. Distinction of hardcoded and local storage saved graphs
        2. Removal of local storage graphs
        3. Properly spawn graphs, with handling correctness of graph's state (weighted, directed)
    3. Random graph spawning:
        1. Adjusting the probability of edge and number of nodes
        2. Placement of nodes on panel using simple trigonometry. Nodes are placed evenly on a circle with given radius.
    4. Fundamental concepts page:
        1. Definitions of essential concepts for learning graph algorithms.
        2. Finding concept by name using search input.
        3. Appending new concepts by using script from instructions folder.

### Visualisation <a name="visualisation"></a>

### Steps <a name="steps"></a>
1. Steps are being visualised as colorings on graph's panel.
2. On right side of page, there are visualised structures used in algorithm. In this program, I call them additionals. Currently supported additionals: 
    - Queue\<string\> 
    - Map\<string, number\>
    - Set\<string\>
    - Array\<string | PlainEdge\>
    - DisjointSetCustom (extension of type DisjointSet for making visualisation of union-find additionals easier)
3. On left side of page, there is textual representation of algorithm's steps. N'th step is being highlighed upon it's visualisation on panel.
4. From steps dropdown, user may also display textual representation of algorithm's description alongside the time and space complexity.
5. The steps may be progressed by using 'Next' button on bottom's side of panel. Moreover, there is also a 'Prev' button, which returns to previous step visualisation.
6. Progression of visualisation may also be animated by clicking 'Animate' button. User have also an ability of changing speed of animation using slider to the left of buttons.
7. Visualisation can be finished by clicking 'Reset' button.

### Writing algorithms <a name="writing algorithms"></a>
1. Before writing actual visualisation algorithm,
it needs to have some metadata filled in:
    1. Text representation of steps
    2. Description with complexity
    3. Pseudocode representation
    3. Metadata of algorithm

The template for metadata filling is available at Developer
route in application. It ensures that user fills valid data.

2. The template generates .json entry, which must be pasted into description.json file in src/algorithms/algorithms_description file and mapping of function's string name to function implemented. From this step algorithm only requires implementation.




## Implementation <a name="implementation"></a>

Examples of implementations can be examined
in the algorithms folder. It is strongly advised to study them
and then try to write algorithms.