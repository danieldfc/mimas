/**
 * Formata grande cadeia de caracteres e adiciona 3 pontos no final,
 * Caso a quantidade máxima de caracteres for atingida.
 *
 * @param str - Cadeia de caracteres - Obrigatório
 * @param qtdMax - Default 80
 * @example
 * formatBigString('Lorem ipsum')    // returns: 'Lorem ipsum'
 * formatBigString('Lorem ipsum', 5) // returns: 'Lorem...'
 */
export default function formatBigString(str: string, qtdMax = 80) {
  if (str.length < qtdMax) return str

  return `${str.substring(0, qtdMax)}...`
}
