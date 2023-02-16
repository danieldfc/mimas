export const formatDate = (date: Date) =>
  date.toLocaleTimeString('pt-br', {
    weekday: 'short',
    hour: 'numeric',
    day: '2-digit',
    month: 'short'
  })

export const padStart = (str: string, tam: number, preenchimento: string) =>
  str.padStart(tam, preenchimento)
