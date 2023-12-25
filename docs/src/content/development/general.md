### Using the WebStorm debugger
- Node parameters: `-r dotenv/config --require ts-node/register  --loader ts-node/esm --experimental-specifier-resolution=node`
- Working directory: `path\to\life-screen\server`
- JavaScript file: `src\app.ts`
- Environment variables: `DOTENV_CONFIG_PATH=./.env`

### Vue DevTools

I use the [Vue DevTools](https://devtools.vuejs.org/guide/installation.html) browser extension. I previously used the [standalone version](https://devtools.vuejs.org/guide/installation.html#standalone) when the browser extension didn't seem to be working in Firefox (see below), but have since removed it due to dependency vulnerabilities at the time of writing.

If the Firefox extension is picking up Vue (the icon is lighting up green and clicking it shows a "Vue.js is detected on this page" message) but the tab isn't shown in the browser dev tools, go to the dev tools settings (via the three-dot menu icon in the top right, same place you choose where to dock the panel). There should be a heading "Developer Tools installed by add-ons" where you can tick "Vue.js devtools." The tab should now be available.
