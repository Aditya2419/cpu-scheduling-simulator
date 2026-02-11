export default function GanttChart({chart}){

    if(!chart.length) return null;

    const totalTime =
        chart[chart.length-1].end;

    return(

        <div style={{marginTop:50}}>

            <h2 style={{marginBottom:20}}>
                Gantt Chart
            </h2>

            {/* BLOCKS */}
            <div style={{
                display:'flex',
                alignItems:'stretch'
            }}>

                {chart.map((b,i)=>{

                    const duration =
                        b.end - b.start;

                    const width =
                        (duration / totalTime) * 800;

                    const color =
                        b.pid === 'IDLE'
                        ? '#444'
                        : `hsl(${i*60},70%,60%)`;

                    return(

                        <div key={i}
                            style={{
                                width,
                                background:color,
                                border:'2px solid black',
                                color:'white',
                                textAlign:'center',
                                padding:'20px 0',
                                fontWeight:'bold',
                                borderRadius:'6px',
                                marginTop:20,
                                overflowX:"auto"
                            }}>
                            {b.pid}
                        </div>
                    );
                })}
            </div>

            {/* TIMELINE */}
            <div style={{
                display:'flex'
            }}>

                {chart.map((b,i)=>{

                    const duration =
                        b.end - b.start;

                    const width =
                        (duration / totalTime) * 1000;

                    return(
                        <div key={i}
                            style={{
                                width,
                                display:'flex',
                                justifyContent:'space-between'
                            }}>
                            <span>{b.start}</span>
                            <span>{b.end}</span>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}
