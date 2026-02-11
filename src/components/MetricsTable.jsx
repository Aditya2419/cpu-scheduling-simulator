export default function MetricsTable({processes}){

    if(!processes.length) return null;

    const avgWaiting =
        (processes.reduce((s,p)=>s+p.waiting,0) / processes.length)
        .toFixed(2);

    const avgTurnaround =
        (processes.reduce((s,p)=>s+p.turnaround,0) / processes.length)
        .toFixed(2);

    const avgResponse =
        (processes.reduce((s,p)=>s+p.response,0) / processes.length)
        .toFixed(2);

    return(
        <div style={{marginTop:40}}>

            <h2>Performance Metrics</h2>

            <table border="1" cellPadding="10">

                <thead>
                    <tr>
                        <th>PID</th>
                        <th>Waiting</th>
                        <th>Turnaround</th>
                        <th>Response</th>
                    </tr>
                </thead>

                <tbody>
                    {processes.map(p=>(
                        <tr key={p.pid}>
                            <td>{p.pid}</td>
                            <td>{p.waiting}</td>
                            <td>{p.turnaround}</td>
                            <td>{p.response}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

            <h3>Average Waiting Time: {avgWaiting}</h3>
            <h3>Average Turnaround Time: {avgTurnaround}</h3>
            <h3>Average Response Time: {avgResponse}</h3>

        </div>
    );
}
