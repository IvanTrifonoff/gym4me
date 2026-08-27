import { useEffect, useState } from 'react';
import { restState } from './rest-timer.js';
export function RestTimer({ deadline, onSkip }) { const [, tick] = useState(0); useEffect(() => { const id = setInterval(() => tick(value => value + 1), 250); return () => clearInterval(id); }, []); const state = restState(deadline); if (!state.active) return null; return <aside className="rest-timer" aria-live="polite"><strong>Отдых {Math.floor(state.remaining / 60)}:{String(state.remaining % 60).padStart(2, '0')}</strong><button onClick={onSkip}>Пропустить</button></aside>; }
