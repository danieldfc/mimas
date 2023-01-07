import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO'
import IMailTemplateProvider from '../models/IMailTemplateProvider'

export class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(_: IParseMailTemplateDTO): Promise<string> {
    return 'Mail Content'
  }
}
