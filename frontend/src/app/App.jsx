import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PwaShell from '../shared/components/PwaShell.jsx';

function AthletePlaceholder({ title }) {
  return <section className="pwa-card" style={{ padding: 16 }}><h1>{title}</h1><p style={{ color: 'var(--pwa-label-2)' }}>Athlete domain is being migrated without changing the PWA shell.</p></section>;
}

export default function App() {
  return <BrowserRouter><PwaShell>
    <Routes>
      <Route path="/home" element={<AthletePlaceholder title="Главная" />} />
      <Route path="/plan" element={<AthletePlaceholder title="План" />} />
      <Route path="/workout" element={<AthletePlaceholder title="Тренировка" />} />
      <Route path="/stats" element={<AthletePlaceholder title="Статистика" />} />
      <Route path="/history" element={<AthletePlaceholder title="История" />} />
      <Route path="/library" element={<AthletePlaceholder title="Упражнения" />} />
      <Route path="/settings" element={<AthletePlaceholder title="Настройки" />} />
      <Route path="/notifications" element={<AthletePlaceholder title="Уведомления" />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  </PwaShell></BrowserRouter>;
}
