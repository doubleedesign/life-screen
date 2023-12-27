These docs are a standalone Vue app powered by Markdown and YAML files for the content (thanks to [vite-plugin-md](https://www.npmjs.com/package/vite-plugin-md) and [@modyfi/vite-plugin-yaml](https://www.npmjs.com/package/@modyfi/vite-plugin-yaml)). The app's routes are automatically generated from the folder structure and Markdown files in the `src/content` folder for most pages, except for the REST API section which uses the OpenAPI YAML spec file.

## Automatic route generation and menus
The routes and templates have been designed and tested to work with up to three levels. The main menu displays just the first two levels, but the section menu has been designed and tested for the third level.

That's not to say that more couldn't work, but some tweaks may be needed to account for more levels.

## Adding a new page
* When adding a new first-or-second level directory within `src/content`, ensure you add a file called `index.md` for the root page's content.
* All other page names and routes will be  generated based on the folder and file names, including automatic title casing for page names (e.g., `useful-links.md` becomes `Useful Links`.)

## Expected folder structure

I have adopted a branch-twig-leaf analogy in the code to describe the three levels of nesting for the routes and menus. Branches are the first-level folders and they can contain both twigs (subfolders) and leaves (Markdown files). Twigs contain leaves only. 

All folders (branches and twigs) must contain, at a minimum, an `index.md` file for the content of the root page.

An example of the expected folder structure is as follows:

- src/content
  - :file_folder: branch1
    - :page_facing_up: index.md
    - :page_facing_up: leaf1.md
    - :page_facing_up: leaf2.md
    - :file_folder: twig1
      - :page_facing_up: index.md
      - :page_facing_up: leaf3.md
      - :page_facing_up: leaf4.md
    - :file_folder: twig2
      - :page_facing_up: index.md
      - :page_facing_up: leaf5.md
      - :page_facing_up: leaf6.md
  - :file_folder: branch2
    - :page_facing_up: index.md
    - :file_folder: twig3
      - :page_facing_up: index.md
      - :page_facing_up: leaf7.md
      - :page_facing_up: leaf8.md
      - :page_facing_up: leaf9.md

No Markdown files (leaves) should be placed directly in the `src/content` folder. In an instance where you want a standalone page at the top level, this would be achieved with the structure `src/content/page-name/index.md`.
