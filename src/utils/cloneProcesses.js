export function cloneProcesses(processes){

    return [...processes]
        .sort((a,b)=>a.pid.localeCompare(b.pid))
        .map(p => ({
            ...p,
            remaining: p.burst,
            completion: 0,
            waiting: 0,
            turnaround: 0,
            response: -1
        }));
}
