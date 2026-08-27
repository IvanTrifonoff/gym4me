export function restState(deadline, now = Date.now()) { const remaining = Math.max(0, Math.ceil((deadline - now) / 1000)); return { remaining, active: remaining > 0, percent: deadline > now ? remaining : 0 }; }
export function startRest(duration, now = Date.now()) { return now + Math.max(0, Number(duration) || 0) * 1000; }
