## Microsoft Graph integration

This application requires an app in Azure Active Directory to handle authentication. Then add OAuth, URL, callback, etc details in `server/.env` (all the required keys are listed in that file).

- In the [Azure Portal](https://portal.azure.com), go to Azure Active Directory > App Registrations > life-screen (or whatever you called your app if you're not me).
- Client ID can be found in the app overview, called "Application (client) ID".
- OAuth client secret can be found/created under Certificates & Secrets > "Client Secrets" tab.
- MS_OAUTH_AUTHORITY is `https://login.microsoftonline.com/organizations/` if you are using Office 365; it's different if you're using a personal @outlook.com account.
- Required scopes for me are `user.read,mailboxsettings.read,Calendars.Read,Calendars.Read.Shared`. YMMV, you may not need `Calendars.Read.Shared` if you, well, don't need to read any shared calendars.

Tips:
- Separate multiple scopes with a space.
- **Invalid audience error**: Go to the [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) and log in. Copy the access token shown into the "current token" field in Postman.

## Google Calendar integration

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
