## Using the WebStorm debugger
- Node parameters: `-r dotenv/config --require ts-node/register  --loader ts-node/esm --experimental-specifier-resolution=node`
- Working directory: `path\to\life-screen\server`
- JavaScript file: `src\app.ts`
- Environment variables: `DOTENV_CONFIG_PATH=./.env`

## Postman environment variables

If using environment variables for MS Graph and/or Google Calendar testing, your Postman environment settings should look something like this:

![Postman environment example](https://github.com/doubleedesign/life-screen/blob/version-2/docs/public/postman_env.png?raw=true)
