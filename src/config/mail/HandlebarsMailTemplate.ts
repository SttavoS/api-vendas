import handlebars from 'handlebars';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariables;
}

export default class HandlebarsMailTemplate {
  async parse({ template, variables }: IParseMailTemplate): Promise<string> {
    const partseTemplate = handlebars.compile(template);

    return partseTemplate(variables);
  }
}
