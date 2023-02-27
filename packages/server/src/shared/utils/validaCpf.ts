export const validaCpf = (cpf: string): boolean => {
  const cpfStr = cpf.replace(/[^\d]+/g, '')
  // Verifica se a variável cpf está em branco ou é igual a "undefined", exibindo uma msg de erro
  if (cpfStr === '' || cpfStr === undefined) {
    return false
  }
  // Elimina CPFs invalidos conhecidos
  if (
    cpfStr.length !== 11 ||
    cpfStr === '00000000000' ||
    cpfStr === '11111111111' ||
    cpfStr === '22222222222' ||
    cpfStr === '33333333333' ||
    cpfStr === '44444444444' ||
    cpfStr === '55555555555' ||
    cpfStr === '66666666666' ||
    cpfStr === '77777777777' ||
    cpfStr === '88888888888' ||
    cpfStr === '99999999999'
  ) {
    return false
  }

  // Valida 1o digito
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfStr.charAt(i)) * (10 - i)
  }
  let resto = 11 - (soma % 11)
  if (resto === 10 || resto === 11) {
    resto = 0
  }

  if (resto !== parseInt(cpfStr.charAt(9))) {
    return false
  }

  // Valida 2o digito
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfStr.charAt(i)) * (11 - i)
  }
  resto = 11 - (soma % 11)
  if (resto === 10 || resto === 11) {
    resto = 0
  }

  if (resto !== parseInt(cpfStr.charAt(10))) {
    return false
  }
  return true
}
