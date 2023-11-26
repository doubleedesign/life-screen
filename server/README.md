# Life Screen server app

## O365 Outlook Calendar - Microsoft Graph

### Azure Authentication

This application requires an app in Azure Active Directory to handle authentication. Then add OAuth, URL, callback, etc details in `server/.env` (all the required keys are listed in that file).

- In the [Azure Portal](https://portal.azure.com), go to Azure Active Directory > App Registrations > life-screen (or whatever you called your app if you're not me).
- Client ID can be found in the app overview, called "Application (client) ID".
- OAuth client secret can be found/created under Certificates & Secrets > "Client Secrets" tab.
- MS_OAUTH_AUTHORITY is `https://login.microsoftonline.com/organizations/` if you are using Office 365; it's different if you're using a personal @outlook.com account.
- Required scopes for me are `user.read,mailboxsettings.read,Calendars.Read,Calendars.Read.Shared`. YMMV, you may not need `Calendars.Read.Shared` if you, well, don't need to read any shared calendars.

### Testing with Postman

1. In the Azure portal > Authentication, ensure you have two web redirect URIs:
    - Your application, e.g., `http://localhost:4000/auth/callback`
    - Postman: `https://oauth.pstmn.io/v1/callback`
2. Follow the steps in the article [Tutorial: Calling an Azure AD secured API with Postman](https://dev.to/425show/calling-an-azure-ad-secured-api-with-postman-22co) to log in and get a token. (Side note: This can be used to directly query MS Graph.) 
   - Do this at collection level so you can set other requests to "inherit auth from parent."
   - For multiple scopes, separate them with a space.
3. To then query your own endpoint, untick "authorize using browser" and update the callback URL to the one for your application (e.g., `http://localhost:4000/auth/callback`).

### Useful links

* [MS Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) - find and test sample queries; can be used to get an auth token to use in Postman
* [MS Graph API homepage](https://developer.microsoft.com/en-us/graph/rest-api)
* [Sample MS Graph Node app](https://github.com/microsoftgraph/msgraph-sample-nodeexpressapp)
* [How to register your app to use Azure auth](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
* [Tutorial: Calling an Azure AD secured API with Postman](https://dev.to/425show/calling-an-azure-ad-secured-api-with-postman-22co)
* [Tutorial: Call MS Graph in a console app](https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-nodejs-console)
* [Tutorial: Node.js & Express web app calling Microsoft Graph using MSAL Node](https://github.com/Azure-Samples/ms-identity-javascript-nodejs-tutorial/blob/main/2-Authorization/1-call-graph/README.md)

## Google Calendar

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

### Useful links

* Calendars in [Google APIs Explorer](https://developers.google.com/calendar/api/v3/reference/calendars/get?apix_params=%7B%22calendarId%22%3A%22primary%22%7D)
* Calendars in [Google APIs library for NodeJS](https://googleapis.dev/nodejs/googleapis/latest/calendar/index.html)
* [How to access Google APIs using OAuth 2.0 in Postman](https://blog.postman.com/how-to-access-google-apis-using-oauth-in-postman/)
