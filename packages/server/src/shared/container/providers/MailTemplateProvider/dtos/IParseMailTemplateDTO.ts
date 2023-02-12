interface ITemplateVariables {
  [key: string]: string | number | any[]
}

export default interface IParseMailTemplateDTO {
  file: string
  variables: ITemplateVariables
}
