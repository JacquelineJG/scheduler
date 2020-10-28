export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find(days => days.name === day)
  if (filteredDays === undefined) {
    return [];
  }
  if (state.days.length === 0) {
    return [];
  }
  const filteredApps = filteredDays.appointments.map(id => state.appointments[id]);
  return filteredApps;
}