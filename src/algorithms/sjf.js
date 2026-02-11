export function sjf(processes){

    let time = 0;
    let completed = 0;
    const n = processes.length;

    let gantt = [];

    while(completed < n){

        // get processes that have arrived
        const available = processes
            .filter(p => p.arrival <= time && p.remaining > 0)
            .sort((a,b)=> a.burst - b.burst);

        // ⭐ HANDLE IDLE CPU
        if(available.length === 0){

            let nextArrival = Math.min(
                ...processes
                    .filter(p=>p.remaining>0)
                    .map(p=>p.arrival)
            );

            gantt.push({
                pid:"IDLE",
                start:time,
                end:nextArrival
            });

            time = nextArrival;
            continue;
        }

        const current = available[0];

        // response time
        if(current.response === -1)
            current.response = time - current.arrival;

        gantt.push({
            pid:current.pid,
            start:time,
            end:time + current.burst
        });

        time += current.burst;

        current.remaining = 0;
        current.completion = time;
        current.turnaround = time - current.arrival;
        current.waiting = current.turnaround - current.burst;

        completed++;
    }

    return {
        gantt,
        processes
    };
}
