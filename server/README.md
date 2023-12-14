# Life Screen server app

[Setup](#setup)
- [Microsoft Graph](#microsoft-graph)
- [Google Calendar](#google-calendar)

[Development](#development)
- [Testing this app's endpoints in Postman](#testing-this-apps-endpoints-in-postman)
- [Using the WebStorm debugger](#using-the-webstorm-debugger)
- [Testing MS Graph endpoints with Postman](#testing-ms-graph-endpoints-with-postman)
- [Testing Google Calendar endpoints in Postman](#testing-google-calendar-endpoints-with-postman)
- [Useful Links](#useful-links)

### Microsoft Graph

This application requires an app in Azure Active Directory to handle authentication. Then add OAuth, URL, callback, etc details in `server/.env` (all the required keys are listed in that file).

- In the [Azure Portal](https://portal.azure.com), go to Azure Active Directory > App Registrations > life-screen (or whatever you called your app if you're not me).
- Client ID can be found in the app overview, called "Application (client) ID".
- OAuth client secret can be found/created under Certificates & Secrets > "Client Secrets" tab.
- MS_OAUTH_AUTHORITY is `https://login.microsoftonline.com/organizations/` if you are using Office 365; it's different if you're using a personal @outlook.com account.
- Required scopes for me are `user.read,mailboxsettings.read,Calendars.Read,Calendars.Read.Shared`. YMMV, you may not need `Calendars.Read.Shared` if you, well, don't need to read any shared calendars.

Tips:
- Separate multiple scopes with a space.
- **Invalid audience error**: Go to the [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) and log in. Copy the access token shown into the "current token" field in Postman.

### Google Calendar

1. [Create a Google Cloud project](https://developers.google.com/workspace/guides/create-project) and enable the Calendar API within it.
2. In Google APIs and Services, go to [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent?project=life-screen). As I am using a personal account, not a Workspace account, I have to choose "external". 
3. The next step is Scopes. Search for/find Google Calendar API and select `auth/calendar.acls.readonly`. This should show up under "Your sensitive scopes" when saved.
   - To return to this screen later, go to OAuth Consent Screen, click the "Edit app" button at the top of the page (next to the app name), and re-follow the wizard to get to the Scopes screen.
4. In the next step, add yourself as a test user.
5. Go to [Credentials](https://console.cloud.google.com/apis/credentials?project=life-screen), click the "Create credentials" button, and choose "OAuth client ID". In the wizard that appears, choose "Web application" and enter:
  - Authorised JavaScript origins: Your front-end app URL (e.g., `http://localhost:3000`), and your server URL (e.g., `http://localhost:4000`) if you want to be able to test that directly without a front-end app.
  - Authorised redirect URIs: The server URL/endpoint that will handle the returned authorisation code (e.g., `http://localhost:4000/auth/callback`). 
    - If you're going to test with Postman, also add the Postman redirect URL `https://oauth.pstmn.io/v1/callback`.
6. Click "create" and copy the client ID and secret that appear into your server `.env` file.

## Development

### Testing this app's endpoints in Postman

Because the Express app saves user info, including tokens, in a session using [express-session](https://www.npmjs.com/package/express-session), logging in to the various third-party services as per the below instructions for their own endpoints does nothing for the local endpoints. 

I have so far found the easiest way to test the app's endpoints in Postman is to:
1. Log into the services I want to test using the app endpoints in the browser (e.g., http://localhost:4000/msgraph/auth/login and http://localhost:4000/gcal/auth/login)
2. With the browser's dev tools open, go to http://localhost:4000
3. In the Network tab, grab the session cookie value from the request headers:
![Cookie in the request headers in the browser](https://github.com/doubleedesign/life-screen/blob/version-2/docs/public/session_cookie_example_part_1.png?raw=true)

4. Paste it into the request headers for your app endpoint request in Postman
![Cookie in the request headers in Postman](https://github.com/doubleedesign/life-screen/blob/version-2/docs/public/session_cookie_example_part_2.png?raw=true)
(or add it as an environment variable and use that in the headers)
5. Requests to `localhost:4000` endpoints that require the logged-in values stored in the current session should now work.


### Using the WebStorm debugger
- Node parameters: `-r dotenv/config --require ts-node/register  --loader ts-node/esm --experimental-specifier-resolution=node`
- Working directory: `path\to\life-screen\server`
- JavaScript file: `src\app.ts`
- Environment variables: `DOTENV_CONFIG_PATH=./.env`

### Testing MS Graph endpoints with Postman

1. In the Azure portal > Authentication, ensure you have two web redirect URIs:
    - Your application, e.g., `http://localhost:4000/auth/callback`
    - Postman: `https://oauth.pstmn.io/v1/callback`
2. In Postman, in the Authorization tab, choose OAuth2 and select to add auth data to request headers.
3. Below is a full example of the settings; noting that the variables are saved in a [Postman environment](https://learning.postman.com/docs/sending-requests/environments/managing-environments/) for easy re-use. Select the environment to work in the top right of the screen (it's called LifeScreen here).

![MS Graph Postman example](https://github.com/doubleedesign/life-screen/blob/version-2/docs/public/postman_msgraph.png?raw=true)

### Testing Google Calendar endpoints with Postman

1. In the [Credentials](https://console.cloud.google.com/apis/credentials?project=life-screen) screen, ensure you have two web redirect URIs:
    - Your application, e.g., `http://localhost:4000/auth/callback`
    - Postman: `https://oauth.pstmn.io/v1/callback`
2. In Postman, in the Authorization tab, choose OAuth2 and select to add auth data to request headers.
3. Below is a full example of the settings; noting that the variables are saved in a [Postman environment](https://learning.postman.com/docs/sending-requests/environments/managing-environments/) for easy re-use.

![Google Postman example](https://github.com/doubleedesign/life-screen/blob/version-2/docs/public/postman_google.png?raw=true)

### Postman environment variables

If using environment variables for MS Graph and/or Google Calendar testing, your Postman environment settings should look something like this:

![Postman environment example](https://github.com/doubleedesign/life-screen/blob/version-2/docs/public/postman_env.png?raw=true)

### Useful links

#### MS Graph
* [MS Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) - find and test sample queries; can be used to get an auth token to use in Postman
* [MS Graph API homepage](https://developer.microsoft.com/en-us/graph/rest-api)
* [Sample MS Graph Node app](https://github.com/microsoftgraph/msgraph-sample-nodeexpressapp)
* [How to register your app to use Azure auth](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
* [Tutorial: Calling an Azure AD secured API with Postman](https://dev.to/425show/calling-an-azure-ad-secured-api-with-postman-22co)
* [Tutorial: Call MS Graph in a console app](https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-nodejs-console)
* [Tutorial: Node.js & Express web app calling Microsoft Graph using MSAL Node](https://github.com/Azure-Samples/ms-identity-javascript-nodejs-tutorial/blob/main/2-Authorization/1-call-graph/README.md)

#### Google Calendar
* Calendars in [Google APIs Explorer](https://developers.google.com/calendar/api/v3/reference/calendars/get?apix_params=%7B%22calendarId%22%3A%22primary%22%7D)
* [Node.js Quickstart](https://developers.google.com/calendar/api/quickstart/nodejs) for Google Calendar
* Calendars in [Google APIs library for NodeJS](https://googleapis.dev/nodejs/googleapis/latest/calendar/index.html)
* [How to access Google APIs using OAuth 2.0 in Postman](https://blog.postman.com/how-to-access-google-apis-using-oauth-in-postman/)
* [Google APIs Node.js client](https://www.npmjs.com/package/googleapis) on NPM
