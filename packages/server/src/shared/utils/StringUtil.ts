import { randomBytes } from 'crypto'

export const generateString = (qtdStr: number): string => {
  return randomBytes(qtdStr).toString('hex')
}
