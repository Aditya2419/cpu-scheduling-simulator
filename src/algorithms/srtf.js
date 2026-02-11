export function srtf(processes){

    let time = 0;
    let completed = 0;
    const n = processes.length;

    let gantt = [];
    let currentBlock = null;

    while(completed < n){

        // get arrived processes with remaining time
        const available = processes
            .filter(p => p.arrival <= time && p.remaining > 0)
            .sort((a,b)=> a.remaining - b.remaining);

        // ⭐ CPU IDLE
        if(available.length === 0){
            time++;
            continue;
        }

        const current = available[0];

        // response time (first execution only)
        if(current.response === -1){
            current.response = time - current.arrival;
        }

        // ⭐ create NEW gantt block only if process changes
        if(!currentBlock || currentBlock.pid !== current.pid){

            if(currentBlock){
                currentBlock.end = time;
            }

            currentBlock = {
                pid: current.pid,
                start: time
            };

            gantt.push(currentBlock);
        }

        // execute for 1 time unit
        current.remaining--;
        time++;

        // process finished
        if(current.remaining === 0){

            currentBlock.end = time;

            current.completion = time;
            current.turnaround = time - current.arrival;
            current.waiting = current.turnaround - current.burst;

            completed++;
        }
    }

    return {
        gantt,
        processes
    };
}
