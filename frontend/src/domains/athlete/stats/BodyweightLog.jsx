import { useState } from 'react';
import { addBodyweight, bodyweightPoints } from './bodyweight-model.js';

export function BodyweightLog({ state, saving, update }) {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [message, setMessage] = useState('');
  const points = bodyweightPoints(state);
  const submit = async event => {
    event.preventDefault();
    try {
      await update({ bodyweight: addBodyweight(state, { w: weight, d: date }) });
      setWeight('');
      setMessage('Измерение сохранено');
    } catch (error) {
      setMessage('Введите корректный вес');
    }
  };
  return <section className="pwa-card bodyweight-log">
    <h2>Вес тела</h2>
    <form onSubmit={submit}>
      <label>Вес, кг<input type="number" min="1" max="500" step="0.1" value={weight} onChange={event => setWeight(event.target.value)} required /></label>
      <label>Дата<input type="date" value={date} onChange={event => setDate(event.target.value)} required /></label>
      <button className="pwa-button" disabled={saving}>Добавить измерение</button>
    </form>
    {message && <p className="pwa-muted" role="status">{message}</p>}
    {points.length > 0 && <ul aria-label="Последние измерения">{points.slice(-5).reverse().map(point => <li key={point.d}>{point.d}: <strong>{point.w} кг</strong></li>)}</ul>}
  </section>;
}
