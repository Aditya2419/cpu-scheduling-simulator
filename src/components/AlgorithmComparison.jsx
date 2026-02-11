export default function AlgorithmComparison({data}){

    if(!data.length) return null;

    // find best waiting
    const bestWaiting =
        data.reduce((min,a)=>
            a.waiting < min.waiting ? a : min
        );

    return(

        <div>

            <h2>Algorithm Comparison</h2>

            <table border="1" cellPadding="10">

                <thead>
                    <tr>
                        <th>Algorithm</th>
                        <th>Avg Waiting</th>
                        <th>Avg Turnaround</th>
                        <th>Avg Response</th>
                    </tr>
                </thead>

                <tbody>

                    {data.map(a=>(
                        <tr key={a.name}
                            style={{
                                background:
                                    a.name === bestWaiting.name
                                    ? "#d4edda"
                                    : "white"
                            }}>
                            <td>{a.name}</td>
                            <td>{a.waiting}</td>
                            <td>{a.turnaround}</td>
                            <td>{a.response}</td>
                            <td>{a.waiting.toFixed(2)}</td>

                        </tr>
                    ))}

                </tbody>

            </table>


            <h3 style={{marginTop:20}}>
                ⭐ Best Algorithm (Lowest Waiting Time):
                {" "}
                {bestWaiting.name}
            </h3>

        </div>
    );
}
