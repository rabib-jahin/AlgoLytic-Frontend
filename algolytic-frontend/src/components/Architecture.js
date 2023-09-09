import { useEffect } from 'react'
import '../assets/css/architecture.css'
import { toast } from 'react-toastify'
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

const Architecture=props=>{



    const initialNodes = [
        { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
        { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
      ];
    const initialEdges = [{ id: 'e1-2', source: '1', target: '2',animated:true,style: {
        stroke: 'black',
    } }];

    return(
        <div className='architecture-container'>
            <ReactFlow 
                fitView
                 nodes={initialNodes} edges={initialEdges} />
        </div>
    )
}

export default Architecture