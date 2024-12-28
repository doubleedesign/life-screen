# Life Screen back-end app 

- [General dev notes](#general-dev-notes)
  - [Using the WebStorm debugger](#using-the-webstorm-debugger)
  - [Postman environment variables](#postman-environment-variables)
- [Setting up integrations](/docs/setup-integrations.md)
- [Testing integrations](/docs/testing-integrations.md)
- [Useful links](#useful-links)

---
## General dev notes

### Using the WebStorm debugger
For the back-end app:
- Node parameters: `-r dotenv/config --require ts-node/register  --loader ts-node/esm --experimental-specifier-resolution=node`
- Working directory: `path\to\life-screen\server`
- JavaScript file: `src\app.ts`
- Environment variables: `DOTENV_CONFIG_PATH=./.env`

### Postman environment variables

If using environment variables for MS Graph and/or Google Calendar testing, your Postman environment settings should look something like this:

![Postman environment example](https://github.com/doubleedesign/life-screen/blob/version-2/docs/public/postman_env.png?raw=true)


---
## Useful links

### Microsoft Graph integration

* [MS Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) - find and test sample queries; can be used to get an auth token to use in Postman
* [MS Graph API homepage](https://developer.microsoft.com/en-us/graph/rest-api)
* [Sample MS Graph Node app](https://github.com/microsoftgraph/msgraph-sample-nodeexpressapp)
* [How to register your app to use Azure auth](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
* [Tutorial: Calling an Azure AD secured API with Postman](https://dev.to/425show/calling-an-azure-ad-secured-api-with-postman-22co)
* [Tutorial: Call MS Graph in a console app](https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-nodejs-console)
* [Tutorial: Node.js & Express web app calling Microsoft Graph using MSAL Node](https://github.com/Azure-Samples/ms-identity-javascript-nodejs-tutorial/blob/main/2-Authorization/1-call-graph/README.md)

### Google Calendar integration

* Calendars in [Google APIs Explorer](https://developers.google.com/calendar/api/v3/reference/calendars/get?apix_params=%7B%22calendarId%22%3A%22primary%22%7D)
* [Node.js Quickstart](https://developers.google.com/calendar/api/quickstart/nodejs) for Google Calendar
* Calendars in [Google APIs library for NodeJS](https://googleapis.dev/nodejs/googleapis/latest/calendar/index.html)
* [How to access Google APIs using OAuth 2.0 in Postman](https://blog.postman.com/how-to-access-google-apis-using-oauth-in-postman/)
* [Google APIs Node.js client](https://www.npmjs.com/package/googleapis) on NPM

