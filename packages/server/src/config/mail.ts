type IMailConfig = {
  driver: 'ethereal' | 'mailtrap' | 'ses'
  mailtrap?: {
    host: string
    port: number
    user: string
    pass: string
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  mailtrap: {
    host: process.env.MAIL_HOST || '',
    port: parseInt(process.env.MAIL_PORT || '2525'),
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || ''
  }
} as IMailConfig
