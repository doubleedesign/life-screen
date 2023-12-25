## These docs

These docs are a standalone Vue app powered by Markdown and YAML files for the content (thanks to [vite-plugin-md](https://www.npmjs.com/package/vite-plugin-md) and [@modyfi/vite-plugin-yaml](https://www.npmjs.com/package/@modyfi/vite-plugin-yaml)). The app's routes are automatically generated from the folder structure and Markdown files in the `src/content` folder for most pages, except for the REST API section which uses the OpenAPI YAML spec file.

### Adding a new page
* When adding a new first-or-second level directory within `src/content`, ensure you add a file called `index.md` for the root page's content.
* All other page names and routes will be  generated based on the folder and file names, including automatic title casing for page names (e.g., `useful-links.md` becomes `Useful Links`.)

### Automatic route generation and menus
The routes and templates have been designed and tested to work with up to three levels of nesting. The main menu displays just the first two levels, but the section menu has been designed and tested for the third level. 
