import pluralize from "pluralize";

export default function (plop) {
  plop.setHelper("plural", function (text) {
    return pluralize(text);
  });

  plop.setHelper("singular", function (text) {
    return pluralize.singular(text);
  });

  plop.setHelper("camel", function (text) {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word) {
        return word.toUpperCase();
      })
      .replace(/\s+/g, "");
  });

  plop.setGenerator("generate", {
    description: "",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Resource name please",
      },
    ],
    actions: [
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
    ],
  });
}
