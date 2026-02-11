import { useState } from 'react';
import ProcessForm from './components/ProcessForm';
import GanttChart from './components/GanttChart';
import MetricsTable from './components/MetricsTable';

import { fcfs } from './algorithms/fcfs';
import { sjf } from './algorithms/sjf';
import { srtf } from "./algorithms/srtf";
import { roundRobin } from "./algorithms/rr";

import { cloneProcesses } from './utils/cloneProcesses';
import AlgorithmComparison from './components/AlgorithmComparison';



function App(){

    const [processes, setProcesses] = useState([]);
    const [chart, setChart] = useState([]);
    const [metrics, setMetrics] = useState([]);
    const [algorithm, setAlgorithm] = useState("fcfs");
    const [quantum, setQuantum] = useState(2);
    const [comparison, setComparison] = useState([]);



    // ⭐ CARD STYLE (VERY IMPORTANT)
    const cardStyle = {
        background:"#ffffff",
        padding:"25px",
        borderRadius:"10px",
        boxShadow:"0 4px 12px rgba(0,0,0,0.08)",
        marginBottom:"25px"
    };


    function run(){

        if(processes.length === 0){
            alert("Add processes first");
            return;
        }

        const cloned = cloneProcesses(processes);

        let result;

        switch(algorithm){

            case "fcfs":
                result = fcfs(cloned);
                break;

            case "sjf":
                result = sjf(cloned);
                break;

            case "srtf":
                result = srtf(cloned);
                break;
            case "rr":
                if(quantum <= 0){
                    alert("Quantum must be greater than 0");
                    return;
                }
            
                result = roundRobin(cloned, quantum);
                break;
            
        }

        setChart(result.gantt);
        setMetrics(result.processes);

        // ⭐ Save averages for comparison
        const avgWaiting =
            result.processes.reduce((s,p)=>s+p.waiting,0) / result.processes.length;
        
        const avgTurnaround =
            result.processes.reduce((s,p)=>s+p.turnaround,0) / result.processes.length;
        
        const avgResponse =
            result.processes.reduce((s,p)=>s+p.response,0) / result.processes.length;
        
        setComparison(prev => {
        
            const filtered =
                prev.filter(a => a.name !== algorithm);
        
            return [
                ...filtered,
                {
                    name: algorithm.toUpperCase(),
                    waiting: avgWaiting,
                    turnaround: avgTurnaround,
                    response: avgResponse
                }
            ];
        });
            }


    return(
        <div style={{
            maxWidth:1000,
            margin:"40px auto",
            padding:"30px",
            fontFamily:"system-ui"
        }}>

            {/* ⭐ CENTERED TITLE */}
            <h1 style={{
                textAlign:"center",
                marginBottom:"30px"
            }}>
                CPU Scheduling Simulator
            </h1>


            {/* PROCESS INPUT */}
            <div style={cardStyle}>
                <h2>Add Process</h2>
                <ProcessForm setProcesses={setProcesses} />
            </div>


            {/* CONTROLS */}
            <div style={cardStyle}>

                <h2>Scheduler Controls</h2>

                <select
                    value={algorithm}
                    onChange={(e)=>setAlgorithm(e.target.value)}
                    style={{padding:"6px"}}
                >
                    <option value="fcfs">FCFS</option>
                    <option value="sjf">SJF</option>
                    <option value="srtf">SRTF</option>
                    <option value="rr">Round Robin</option>
                </select>


                {/* ⭐ SHOW QUANTUM ONLY FOR RR */}
                {algorithm === "rr" && (
                    <>
                        <br/><br/>

                        <label>Time Quantum: </label>

                        <input
                            type="number"
                            value={quantum}
                            min="1"
                            onChange={(e)=>setQuantum(Number(e.target.value))}
                            style={{width:"70px", padding:"4px"}}
                        />
                    </>
                )}

                <br/><br/>

                <button
                    onClick={run}
                    style={{
                        padding:"10px 18px",
                        borderRadius:"6px",
                        border:"none",
                        background:"#4CAF50",
                        color:"white",
                        cursor:"pointer",
                        fontWeight:"bold"
                    }}
                >
                    Run {algorithm.toUpperCase()}
                </button>

            </div>


            {/* GANTT */}
            {chart.length > 0 && (
                <div style={cardStyle}>
                    <h2>Gantt Chart</h2>
                    <GanttChart chart={chart}/>
                </div>
            )}

            {/* METRICS */}
            {metrics.length > 0 && (
              <div style={cardStyle}>
                <MetricsTable processes={metrics}/>
                </div>
              )}
            {/* COMPARISON */}
            {comparison.length > 0 && (
              <div style={cardStyle}>    
              <AlgorithmComparison data={comparison} />
              </div>
            )}
            </div>
            );
}

export default App;
