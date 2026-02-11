export function roundRobin(processes, quantum){

    let time = 0;
    let completed = 0;
    const n = processes.length;

    let gantt = [];
    let queue = [];

    // sort by arrival
    processes.sort((a,b)=>a.arrival-b.arrival);

    let i = 0;

    while(completed < n){

        // add newly arrived processes
        while(i < n && processes[i].arrival <= time){
            queue.push(processes[i]);
            i++;
        }

        // CPU idle
        if(queue.length === 0){
            time++;
            continue;
        }

        const current = queue.shift();

        // response time
        if(current.response === -1){
            current.response = time - current.arrival;
        }

        const execTime =
            Math.min(quantum, current.remaining);

        gantt.push({
            pid: current.pid,
            start: time,
            end: time + execTime
        });

        time += execTime;
        current.remaining -= execTime;

        // check arrivals during execution
        while(i < n && processes[i].arrival <= time){
            queue.push(processes[i]);
            i++;
        }

        if(current.remaining > 0){
            queue.push(current);
        }
        else{
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