import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

export default class HandlebarsMailTemplate {
  async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const partseTemplate = handlebars.compile(templateFileContent);

    return partseTemplate(variables);
  }
}
