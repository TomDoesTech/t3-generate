import pluralize from "pluralize";
import Handlebars from "handlebars";

export default function (plop) {
  plop.setHelper("plural", function (text) {
    return pluralize(text);
  });

  plop.setHelper("singular", function (text) {
    return pluralize.singular(text);
  });

  plop.setHelper("fieldsToZod", function ({ hash }) {
    const { method, fields } = hash;

    const schema = fields.split(" ").map((field) => {
      const s = field.split(":");

      return {
        name: s[0],
        type: s[1],
      };
    });

    return new Handlebars.SafeString(
      `${schema.map((prop) => {
        return prop.name + ": z." + prop.type + "()" + "\n";
      })}`
    );
  });

  plop.setGenerator("generate", {
    description: "",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of your resource?",
      },
      {
        type: "input",
        name: "fields",
        message: "What fields will your resource have?",
      },
    ],
    actions: [
      /*
       * Creates pages for basic CRUD operations
       */
      {
        type: "add",
        path: "{{rootPath}}/src/pages/{{ plural name}}/index.tsx",
        templateFile: "plop-templates/pages/index.hbs",
        data: { rootPath: process.cwd() },
      },
      {
        type: "add",
        path: "{{rootPath}}/src/pages/{{ plural name}}/new.tsx",
        templateFile: "plop-templates/pages/new.hbs",
        data: { rootPath: process.cwd() },
      },
      {
        type: "add",
        path: "{{rootPath}}/src/pages/{{ plural name}}/[{{ singular name }}Id]/index.tsx",
        templateFile: "plop-templates/pages/resource.hbs",
        data: { rootPath: process.cwd() },
      },
      {
        type: "add",
        path: "{{rootPath}}/src/pages/{{ plural name}}/[{{ singular name }}Id]/edit.tsx",
        templateFile: "plop-templates/pages/edit.hbs",
        data: { rootPath: process.cwd() },
      },

      /*
       * Creates a router with basic CRUD operations
       */
      {
        type: "add",
        path: "{{rootPath}}/src/server/router/{{ lowerCase name }}.ts",
        templateFile: "plop-templates/server/router.hbs",
        data: { rootPath: process.cwd() },
      },
      /*
       * Appends the router to the appRouter
       */
      {
        type: "append",
        path: "{{rootPath}}/src/server/router/index.ts",
        template: `import { {{name}}Router } from "./{{ name }}";`,
        data: { rootPath: process.cwd() },
        pattern: "/* T3_SCAFFOLD_INJECT_IMPORT */",
      },
      {
        type: "append",
        path: "{{rootPath}}/src/server/router/index.ts",
        template: `.merge("{{ plural name }}", {{ name }}Router)`,
        data: { rootPath: process.cwd() },
        pattern: "/* T3_SCAFFOLD_INJECT_MERGE */",
      },
    ],
  });
}
