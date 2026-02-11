export function fcfs(processes){

    let time = 0;
    let gantt = [];

    const sorted = [...processes].sort(
        (a,b)=>a.arrival-b.arrival
    );

    sorted.forEach(p=>{

        // ⭐ INSERT IDLE BLOCK
        if(time < p.arrival){

            gantt.push({
                pid:'IDLE',
                start:time,
                end:p.arrival
            });

            time = p.arrival;
        }

        gantt.push({
            pid:p.pid,
            start:time,
            end:time + p.burst
        });

        time += p.burst;
    });

    return {
        gantt,
        processes
    };
}
