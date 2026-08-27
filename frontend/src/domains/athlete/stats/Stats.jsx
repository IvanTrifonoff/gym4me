import { useEffect, useState } from 'react';
import { useAthleteStore } from '../athlete-store.js';
import { bodyweightStats, exerciseStats, streakDays, workoutStats } from './stats-model.js';
import { bodyweightSeries, chartPoints } from './bodyweight-analytics.js';

export function Stats() {
  const { state, load, loading } = useAthleteStore();
  const [period, setPeriod] = useState(30);
  useEffect(() => { if (!state.workouts?.length && !state.bodyweight?.length) load(); }, [load, state.workouts?.length, state.bodyweight?.length]);
  const totals = workoutStats(state, period);
  const body = bodyweightStats(state, period);
  const bodySeries = bodyweightSeries(state, period);
  const exercises = exerciseStats(state, period);
  const points = chartPoints(bodySeries);
  return <section><div className="row-between"><div><h1>Статистика</h1><p className="pwa-muted">Прогресс и история</p></div><select value={period} onChange={e => setPeriod(Number(e.target.value))} aria-label="Период"><option value="7">7 дней</option><option value="30">30 дней</option><option value="90">90 дней</option><option value="0">Всё время</option></select></div>{loading && <p className="pwa-muted">Загрузка статистики…</p>}<div className="stats-grid"><div className="pwa-card"><strong>{totals.workouts}</strong><span>Тренировок</span></div><div className="pwa-card"><strong>{totals.sets}</strong><span>Подходов</span></div><div className="pwa-card"><strong>{totals.volume}</strong><span>Объём, кг</span></div><div className="pwa-card"><strong>{streakDays(state)}</strong><span>Дней подряд</span></div></div><section className="pwa-card stats-body"><h2>Вес тела</h2>{body.count ? <><p><strong>{body.latest} кг</strong> · изменение {body.delta > 0 ? '+' : ''}{body.delta} кг · среднее {body.average.toFixed(1)} кг</p><svg className="bodyweight-chart" viewBox="0 0 320 120" role="img" aria-label="График веса тела"><polyline points={points} fill="none" stroke="var(--pwa-accent)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg><small className="pwa-muted">{bodySeries[0]?.d} — {bodySeries.at(-1)?.d}</small></> : <p className="pwa-muted">Нет измерений за период.</p>}</section><h2>Упражнения</h2>{exercises.length ? <div className="stats-list">{exercises.map(ex => <div className="pwa-card stats-row" key={ex.id}><strong>{ex.id}</strong><span>{ex.sets} подходов · {ex.volume} кг · максимум {ex.best} кг</span></div>)}</div> : <div className="pwa-card"><p>Завершите тренировку, чтобы увидеть статистику.</p></div>}</section>;
}
