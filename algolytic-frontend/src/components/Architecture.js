import { useEffect, useCallback } from 'react'
import '../assets/css/architecture.css'
import 'reactflow/dist/style.css';
import { toast } from 'react-toastify'
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';
import axios from 'axios';
import { getApiUrl } from '../App';

var initialNodes = [
    {
        "id": "1",
        "type": "input",
        "position": {
            "x": -241.29361591156487,
            "y": -190.4188980136497
        },
        "data": {
            "label": "Frontend Codebase"
        },
        "style": {
            "backgroundColor": "DodgerBlue",
            "border": "none",
            "color": "white",
            "width": "80px",
            "fontWeight": "bold"
        },
        "width": 80,
        "height": 52,
        "selected": false,
        "positionAbsolute": {
            "x": -241.29361591156487,
            "y": -190.4188980136497
        },
        "dragging": false
    },
    {
        "id": "2",
        "position": {
            "x": -233.85876199460043,
            "y": -75.77588425991834
        },
        "data": {
            "label": "dev Branch"
        },
        "style": {
            "backgroundColor": "pink",
            "border": "none",
            "color": "purple",
            "width": "60px",
            "fontWeight": "bold"
        },
        "width": 60,
        "height": 52,
        "selected": true,
        "positionAbsolute": {
            "x": -233.85876199460043,
            "y": -75.77588425991834
        },
        "dragging": false
    },
    {
        "id": "3",
        "position": {
            "x": -337.9958703284487,
            "y": 64.92183889172756
        },
        "data": {
            "label": "main Branch"
        },
        "style": {
            "backgroundColor": "lightgreen",
            "border": "none",
            "color": "darkgreen",
            "width": "60px",
            "fontWeight": "bold"
        },
        "width": 60,
        "height": 52,
        "selected": false,
        "positionAbsolute": {
            "x": -337.9958703284487,
            "y": 64.92183889172756
        },
        "dragging": false
    },
    {
        "id": "4",
        "position": {
            "x": -141.02250672676354,
            "y": 153.88692169436865
        },
        "data": {
            "label": "Dev Deploy"
        },
        "style": {
            "backgroundColor": "GoldenRod",
            "border": "none",
            "color": "white",
            "width": "80px",
            "fontWeight": "bold"
        },
        "width": 80,
        "height": 52,
        "selected": false,
        "positionAbsolute": {
            "x": -141.02250672676354,
            "y": 153.88692169436865
        },
        "dragging": false
    },
    {
        "id": "5",
        "type": "output",
        "position": {
            "x": -173.8134949484359,
            "y": 228.9036742499689
        },
        "data": {
            "label": "https://dev.algolytic.pro"
        },
        "style": {
            "backgroundColor": "#f5f5f5",
            "border": "none",
            "color": "darkred",
            "width": "150px",
            "fontSize": "0.45em",
            "fontWeight": "bold"
        },
        "width": 150,
        "height": 30,
        "selected": false,
        "positionAbsolute": {
            "x": -173.8134949484359,
            "y": 228.9036742499689
        },
        "dragging": false
    },
    {
        "id": "6",
        "position": {
            "x": -316.8923890035645,
            "y": 180.20046812893904
        },
        "data": {
            "label": "Prod Deploy"
        },
        "style": {
            "backgroundColor": "coral",
            "border": "none",
            "color": "white",
            "width": "80px",
            "fontWeight": "bold"
        },
        "width": 80,
        "height": 52,
        "selected": false,
        "positionAbsolute": {
            "x": -316.8923890035645,
            "y": 180.20046812893904
        },
        "dragging": false
    },
    {
        "id": "7",
        "type": "output",
        "position": {
            "x": -349.5094382351602,
            "y": 255.2466252578395
        },
        "data": {
            "label": "https://algolytic.pro"
        },
        "style": {
            "backgroundColor": "#f5f5f5",
            "border": "none",
            "color": "darkred",
            "width": "150px",
            "fontSize": "0.45em",
            "fontWeight": "bold"
        },
        "width": 150,
        "height": 30,
        "selected": false,
        "positionAbsolute": {
            "x": -349.5094382351602,
            "y": 255.2466252578395
        },
        "dragging": false
    },
    {
        "id": "8",
        "type": "input",
        "position": {
            "x": 55.487719855040055,
            "y": -195.74134589473448
        },
        "data": {
            "label": "Backend Codebase"
        },
        "style": {
            "backgroundColor": "DodgerBlue",
            "border": "none",
            "color": "white",
            "width": "80px",
            "fontWeight": "bold"
        },
        "width": 80,
        "height": 52,
        "selected": false,
        "positionAbsolute": {
            "x": 55.487719855040055,
            "y": -195.74134589473448
        },
        "dragging": false
    },
    {
        "id": "9",
        "position": {
            "x": 113.10542452728887,
            "y": -70.07934538509792
        },
        "data": {
            "label": "dev Branch"
        },
        "style": {
            "backgroundColor": "pink",
            "border": "none",
            "color": "purple",
            "width": "60px",
            "fontWeight": "bold"
        },
        "width": 60,
        "height": 52,
        "selected": false,
        "positionAbsolute": {
            "x": 113.10542452728887,
            "y": -70.07934538509792
        },
        "dragging": false
    },
    {
        "id": "10",
        "position": {
            "x": 174.22886596621012,
            "y": 128.02537537847397
        },
        "data": {
            "label": "main Branch"
        },
        "style": {
            "backgroundColor": "lightgreen",
            "border": "none",
            "color": "darkgreen",
            "width": "60px",
            "fontWeight": "bold"
        },
        "width": 60,
        "height": 52,
        "selected": false,
        "positionAbsolute": {
            "x": 174.22886596621012,
            "y": 128.02537537847397
        },
        "dragging": false
    },
    {
        "id": "11",
        "position": {
            "x": 0.7333658067385755,
            "y": 56.92000400675595
        },
        "data": {
            "label": "Dev Deploy"
        },
        "style": {
            "backgroundColor": "GoldenRod",
            "border": "none",
            "color": "white",
            "width": "80px",
            "fontWeight": "bold"
        },
        "width": 80,
        "height": 52,
        "selected": false,
        "positionAbsolute": {
            "x": 0.7333658067385755,
            "y": 56.92000400675595
        },
        "dragging": false
    },
    {
        "id": "12",
        "type": "output",
        "position": {
            "x": -29.26831752850093,
            "y": 133.8805855218505
        },
        "data": {
            "label": "https://dev.algolytic.pro/api/v1.0.0"
        },
        "style": {
            "backgroundColor": "#f5f5f5",
            "border": "none",
            "color": "darkred",
            "width": "150px",
            "fontSize": "0.45em",
            "fontWeight": "bold"
        },
        "width": 150,
        "height": 30,
        "selected": false,
        "positionAbsolute": {
            "x": -29.26831752850093,
            "y": 133.8805855218505
        },
        "dragging": false
    },
    {
        "id": "13",
        "position": {
            "x": 458.42541818371797,
            "y": 96.50944067414193
        },
        "data": {
            "label": "Prod Deploy"
        },
        "style": {
            "backgroundColor": "coral",
            "border": "none",
            "color": "white",
            "width": "80px",
            "fontWeight": "bold"
        },
        "width": 80,
        "height": 52,
        "selected": false,
        "positionAbsolute": {
            "x": 458.42541818371797,
            "y": 96.50944067414193
        },
        "dragging": false
    },
    {
        "id": "14",
        "type": "output",
        "position": {
            "x": 424.69676834696406,
            "y": 193.78267361166212
        },
        "data": {
            "label": "https://bsj598t5n8.execute-api.ca-central-1.amazonaws.com/algolytic/api/v1.0.0"
        },
        "style": {
            "backgroundColor": "#f5f5f5",
            "border": "none",
            "color": "darkred",
            "width": "150px",
            "fontSize": "0.45em",
            "fontWeight": "bold"
        },
        "width": 150,
        "height": 49,
        "selected": false,
        "positionAbsolute": {
            "x": 424.69676834696406,
            "y": 193.78267361166212
        },
        "dragging": false
    },
    {
        "id": "15",
        "position": {
            "x": 357.3806937450105,
            "y": 27.03520257332979
        },
        "type": "output",
        "data": {
            "label": "Tests"
        },
        "style": {
            "backgroundColor": "Linen",
            "border": "none",
            "color": "MediumVioletRed",
            "width": "50px",
            "fontWeight": "bold"
        },
        "width": 50,
        "height": 36,
        "selected": false,
        "positionAbsolute": {
            "x": 357.3806937450105,
            "y": 27.03520257332979
        },
        "dragging": false
    }
]
// const initialEdges = [{
//     id: 'e1-2', source: '1', target: '2', animated: true, style: {
//         stroke: 'black',
//     }
// }];

var initEdges = [
    {
        "source": "1",
        "sourceHandle": null,
        "target": "2",
        "targetHandle": null,
        "id": "reactflow__edge-1-2"
    },
    {
        "source": "2",
        "sourceHandle": null,
        "target": "3",
        "targetHandle": null,
        "id": "reactflow__edge-2-3"
    },
    {
        "source": "2",
        "sourceHandle": null,
        "target": "4",
        "targetHandle": null,
        "id": "reactflow__edge-2-4"
    },
    {
        "source": "3",
        "sourceHandle": null,
        "target": "6",
        "targetHandle": null,
        "id": "reactflow__edge-3-6"
    },
    {
        "source": "6",
        "sourceHandle": null,
        "target": "7",
        "targetHandle": null,
        "id": "reactflow__edge-6-7"
    },
    {
        "source": "4",
        "sourceHandle": null,
        "target": "5",
        "targetHandle": null,
        "id": "reactflow__edge-4-5"
    },
    {
        "source": "8",
        "sourceHandle": null,
        "target": "9",
        "targetHandle": null,
        "id": "reactflow__edge-8-9"
    },
    {
        "source": "9",
        "sourceHandle": null,
        "target": "15",
        "targetHandle": null,
        "id": "reactflow__edge-9-15"
    },
    {
        "source": "10",
        "sourceHandle": null,
        "target": "13",
        "targetHandle": null,
        "id": "reactflow__edge-10-13"
    },
    {
        "source": "13",
        "sourceHandle": null,
        "target": "14",
        "targetHandle": null,
        "id": "reactflow__edge-13-14"
    },
    {
        "source": "9",
        "sourceHandle": null,
        "target": "11",
        "targetHandle": null,
        "id": "reactflow__edge-9-11"
    },
    {
        "source": "11",
        "sourceHandle": null,
        "target": "12",
        "targetHandle": null,
        "id": "reactflow__edge-11-12"
    },
    {
        "source": "9",
        "sourceHandle": null,
        "target": "10",
        "targetHandle": null,
        "id": "reactflow__edge-9-10"
    }
]

const Architecture = props => {

    //state==success,error,loading


    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);


    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


    const setAllEdges=async (currentState)=>{
        var initialEdges=JSON.parse(JSON.stringify(initEdges))
        Object.keys(currentState).map(k=>{
            var edgeProps=currentState[k]
            initialEdges.map((e,i)=>{
                if(e.id===edgeProps.edgeId){
                    var currEdge=e
                    currEdge['label']=`[${edgeProps.label}${new Date(edgeProps.timestamp).toLocaleString()}]`
                    if(edgeProps.state==='loading'){
                        currEdge['animated']= true
                        currEdge['style']={
                            strokeWidth:'3px',
                            stroke:'blue'
                        }
                        currEdge['labelStyle']={
                            fill:'blue'
                        }
                    }else if(edgeProps.state==='success'){
                        currEdge['animated']= false
                        currEdge['style']={
                            strokeWidth:'1.5px',
                            stroke:'green'
                        }
                        currEdge['labelStyle']={
                            fill:'green'
                        }
                    }
                    else if(edgeProps.state==='error'){
                        currEdge['animated']= false
                        currEdge['style']={
                            strokeWidth:'2px',
                            stroke:'red'
                        }
                        currEdge['labelStyle']={
                            fill:'red'
                        }
                    }
                    initialEdges[i]=currEdge
                }
            })
        })

        console.log(initialEdges)

        setEdges(initialEdges)
    }

    const initializeLongPolling=async ()=>{
        var api=getApiUrl()
        var res=await axios.get(`${api}/webhook/connect`,{ timeout: 60000*60 })
        var currentState=res.data
        setAllEdges(currentState)
        initializeLongPolling()
    }

    //sdsdsd

    const initialize=async ()=>{
        var api=getApiUrl()
        var res=await axios.get(`${api}/webhook/initialize`,{ timeout: 60000*60 })
        var currentState=res.data
        console.log(currentState)
        setAllEdges(currentState)
        initializeLongPolling()
    }

    useEffect(()=>{
        initialize()
    },[])

    return (
        <div className='architecture-container'>
            <ReactFlow
                fitView
                nodes={nodes}
                edges={edges}
                proOptions={{ hideAttribution: true }}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                {/* <Controls /> */}
                {/* <MiniMap /> */}
                <Background variant="dots" gap={16} size={1} />
            </ReactFlow>
        </div>
    )
}

export default Architecture