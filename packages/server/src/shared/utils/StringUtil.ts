import { randomBytes } from 'crypto'

export const generateString = (qtdStr: number): string => {
  return randomBytes(qtdStr).toString('hex')
}

export const padStart = (str: string, tam: number, preenchimento: string) =>
  str.padStart(tam, preenchimento)
