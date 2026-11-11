export function startOfDay(now = new Date()) {
  const date = new Date(now);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function isDateUnavailable(date, now = new Date()) {
  return date < startOfDay(now) || date.getDay() === 0;
}

export function isSlotUnavailable(date, time, index, doctor, service, now = new Date()) {
  if (!date || isDateUnavailable(date, now)) return true;
  const [hour, minute] = time.split(':').map(Number);
  const start = new Date(date);
  start.setHours(hour, minute, 0, 0);
  return start <= now || (index + date.getDate() + doctor + service) % 5 === 0;
}

export function validateClient(name, phone) {
  if (name.trim().length < 2) return 'Введите имя — минимум 2 символа.';
  if (!/^\+?[\d\s().-]+$/.test(phone.trim()) || !/^\d{10,15}$/.test(phone.replace(/\D/g, ''))) {
    return 'Введите корректный номер телефона.';
  }
  return '';
}
