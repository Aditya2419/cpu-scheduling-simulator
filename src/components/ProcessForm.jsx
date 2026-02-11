import {useState} from 'react';

export default function ProcessForm({setProcesses}){

    const [pid,setPid]=useState('');
    const [arrival,setArrival]=useState('');
    const [burst,setBurst]=useState('');

    function add(){

        setProcesses(prev=>[
            ...prev,
            {
                pid,
                arrival:Number(arrival),
                burst:Number(burst)
            }
        ]);

        setPid('');
        setArrival('');
        setBurst('');
    }

    return(
        <div>

            <h2>Add Process</h2>

            <input placeholder="PID"
                value={pid}
                onChange={e=>setPid(e.target.value)}
            />

            <input placeholder="Arrival"
                onChange={e=>setArrival(e.target.value)}
            />

            <input placeholder="Burst"
                onChange={e=>setBurst(e.target.value)}
            />

            <button onClick={add}>
                Add
            </button>

        </div>
    )
}
