
# t3-generator
Generates code for your application scaffolded by [Create T3 App](https://create.t3.gg/)

## Why?
Creating all the files for a single resource is time-consuming and boring, you want to get to the parts that make your app unique quicker.

## What do you get?
* Pages for basic CRUD operations (listing, view single, edit, create)
* Basic CRUD operations (listing, get single, edit, create, delete)
* Zod schemas for your CRUD operations

## How to
1. Update your router file to include 2 comments.

Insert the PLOP_INJECT_EXPORT comment below your current router imports
```javascript
import { postRouter } from "./post";
import { commentRouter } from "./comment";
/* PLOP_INJECT_EXPORT */
```

Insert the T3_SCAFFOLD_INJECT_MERGE above your current .merge statements
```javascript
export const appRouter = createRouter()
  .transformer(superjson)
  /* T3_SCAFFOLD_INJECT_MERGE */
  .merge("posts.", postRouter)
  .merge("comments.", commentRouter);
```


2. Run `npx t3-generate` in your terminal

3. When prompted, name your resource. For example, `post` or `product`.

4. When prompted supply a list of fields you want your resource to have in the following format `name:type`. For example:

`title:string price:number`

## What's created
**/src/pages/{{ name}}/index.tsx** - A page for listing your new resource

**/src/pages/{{ name}}/new.tsx** - A page for creating a new instance of your resource

**src/pages/{{ plural name}}/[{{ name }}Id]/index.tsx** - A page for viewing a single instance of your resource

**src/pages/{{ plural name}}/[{{ name }}Id]/edit.tsx** - A page for editing an instance of your resource

**{{rootPath}}/src/server/router/{{ name }}.ts** - A router with basic crud operations

## What's next?
* Made Zod schemas for flexible
* Generate Prisma model?