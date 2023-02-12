import fs from 'fs'
import Handlebars from 'handlebars'
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO'
import IMailTemplateProvider from '../models/IMailTemplateProvider'

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider
{
  public async parse({
    file,
    variables
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })

    this.registerHelpers(Handlebars)

    const parseTemplate = Handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }

  private registerHelpers(handlebars: typeof Handlebars): void {
    handlebars.registerHelper('inc', (value: string) => {
      return parseInt(value) + 1
    })
  }
}
