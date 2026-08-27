import { useEffect, useState } from 'react';
import { bodyweightPoints } from './bodyweight-model.js';
import { saveBodyweight, syncBodyweight } from './bodyweight-sync.js';

export function BodyweightLog({ state, saving, update }) {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [message, setMessage] = useState('');
  const [points, setPoints] = useState(() => bodyweightPoints(state));
  const [syncing, setSyncing] = useState(false);
  const sync = async () => {
    setSyncing(true);
    const result = await syncBodyweight(state);
    setPoints(result.points);
    setMessage(result.online ? 'Данные синхронизированы' : 'Офлайн: используются локальные данные');
    setSyncing(false);
  };
  useEffect(() => { let alive = true; syncBodyweight(state).then(result => alive && setPoints(result.points)); return () => { alive = false; }; }, [state.bodyweight]);
  const submit = async event => {
    event.preventDefault();
    try { const next = await saveBodyweight(state, { w: weight, d: date }, update); setPoints(next); setWeight(''); setMessage('Измерение сохранено'); }
    catch { setMessage('Введите корректный вес'); }
  };
  return <section className="pwa-card bodyweight-log"><div className="row-between"><h2>Вес тела</h2><button className="pwa-button" type="button" onClick={sync} disabled={syncing}>{syncing ? 'Синхронизация…' : 'Синхронизировать'}</button></div><form onSubmit={submit}><label>Вес, кг<input type="number" min="1" max="500" step="0.1" value={weight} onChange={event => setWeight(event.target.value)} required /></label><label>Дата<input type="date" value={date} onChange={event => setDate(event.target.value)} required /></label><button className="pwa-button" disabled={saving}>Добавить измерение</button></form>{message && <p className="pwa-muted" role="status">{message}</p>}{points.length > 0 && <ul aria-label="Последние измерения">{points.slice(-5).reverse().map(point => <li key={point.d}>{point.d}: <strong>{point.w} кг</strong></li>)}</ul>}</section>;
}
