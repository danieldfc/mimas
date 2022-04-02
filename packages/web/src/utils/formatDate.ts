export const formatDate = (date: Date) =>
  date.toLocaleTimeString('pt-br', {
    weekday: 'short',
    hour: 'numeric',
    day: '2-digit',
    month: 'short'
  })
