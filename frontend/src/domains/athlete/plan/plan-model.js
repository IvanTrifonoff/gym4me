export const weekDays = [['1','Пн'],['2','Вт'],['3','Ср'],['4','Чт'],['5','Пт'],['6','Сб'],['0','Вс']];
export function routineCount(state) { return Array.isArray(state?.routines) ? state.routines.length : 0; }
export function assignedRoutine(state, day) { const id = state?.week?.[day]; return state?.routines?.find(r => r.id === id) || null; }
export function createStarterPlan() { return [{ id: 'starter-push', name: 'Толкай', emoji: '💪', ex: [] }, { id: 'starter-pull', name: 'Тяни', emoji: '🏋️', ex: [] }, { id: 'starter-legs', name: 'Ноги', emoji: '🦵', ex: [] }]; }
