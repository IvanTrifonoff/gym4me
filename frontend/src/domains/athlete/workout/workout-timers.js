export function elapsedSeconds(start, now = Date.now()) { return Math.max(0, Math.floor((now - start) / 1000)); }
export function formatElapsed(seconds) { const value = Math.max(0, Math.floor(seconds || 0)); return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`; }
export function restDeadline(start, duration) { return start + Math.max(0, Number(duration) || 0) * 1000; }
export function timedSetResult(start, end = Date.now()) { return { sec: elapsedSeconds(start, end), done: true }; }
export function activityPayload(workout, progress, now = Date.now()) { return { active: workout?.status === 'active', name: workout?.name || '', setsDone: progress?.done || 0, setsTotal: progress?.total || 0, startedAt: workout?.start || now }; }
