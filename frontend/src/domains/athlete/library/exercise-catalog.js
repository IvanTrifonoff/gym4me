const RU_NAMES = Object.freeze({ '0027': 'Тяга штанги в наклоне', '0022': 'Пуловер со штангой', '0032': 'Становая тяга со штангой', '0852': 'Приседания с весом', '1311': 'Отжимания широким хватом' });
const CATALOG = Object.freeze([
  { id: '0027', name: 'barbell bent over row', bp: 'back', equipment: 'barbell', gif: '0027.gif', instructions: ['Возьмите штангу контролируемым хватом.', 'Наклоните корпус и держите спину нейтрально.', 'Подтяните штангу к корпусу и медленно опустите.'] },
  { id: '0022', name: 'barbell pullover', bp: 'chest', equipment: 'barbell', gif: '0022.gif', instructions: ['Лягте на скамью и удерживайте штангу.', 'Опустите её за голову с контролем.', 'Верните штангу в исходное положение.'] },
  { id: '0852', name: 'weighted squat', bp: 'upper legs', equipment: 'weighted', gif: '0852.gif', instructions: ['Встаньте устойчиво, удерживая вес.', 'Опуститесь в присед с ровной спиной.', 'Вернитесь в исходное положение через пятки.'] }
]);
export function exerciseName(ex, lang = 'ru') { return lang === 'ru' ? (RU_NAMES[ex.id] || ex.name) : ex.name; }
export function athleteExercises(state, lang = 'ru') { const custom = (state?.customEx || []).map(ex => ({ ...ex, custom: true, name: ex.name || 'Пользовательское упражнение' })); return [...custom, ...CATALOG].map(ex => ({ ...ex, title: exerciseName(ex, lang) })); }
export function searchExercises(state, query = '', lang = 'ru') { const q = query.trim().toLocaleLowerCase(); return athleteExercises(state, lang).filter(ex => !q || [ex.title, ex.name, ex.bp, ex.equipment].some(value => String(value || '').toLocaleLowerCase().includes(q))); }
export function gifUrl(ex, base = '/gif/') { return ex.custom || !ex.gif ? null : `${base}${ex.gif}`; }
export async function loadInstructions(ex) { return ex.custom ? [] : ex.instructions || []; }
