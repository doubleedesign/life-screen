# Life Screen

Using the Microsoft Graph API, Node/Express, and React with TypeScript and Styled Components to bring my calendars together (and other things eventually, e.g., weather forecast is next on the agenda).

Some of the code is specific to my calendars, e.g., exclusions, renaming, categorisation, front-end styling; but this could all easily be adjusted for use by other individuals. So please feel free to fork the repo and have a go (insert standard disclaimer about no warranty etc etc). 

## Azure Authentication

Requires an app in Azure Active Directory to handle authentication. Then add oAuth, URL, callback, etc details in `server/.env` (all the required keys are listed in that file). 

- In the [Azure Portal](https://portal.azure.com), go to Azure Active Directory > App Registrations > life-screen (or whatever you called your app if you're not me).
- Client ID can be found in the app overview, called "Application (client) ID".
- oAuth client secret can be found/refreshed under Certificates & Secrets > "Client Secrets" tab.
- OAUTH_AUTHORITY is `https://login.microsoftonline.com/organizations/` if you are using Office 365; it's different if you're using a personal @outlook.com account.
- Required scopes for me are `user.read,mailboxsettings.read,Calendars.Read,Calendars.Read.Shared`. YMMV, you may not need `Calendars.Read.Shared` if you, well, don't need to read any shared calendars.

## Front-End

You will need to configure your own [Font Awesome access](https://fontawesome.com/docs/web/setup/packages) (or remove the icons). Otherwise, install errors will occur for the front-end app. 

## Useful links
* [MS Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) - find and test sample queries; can be used to get an auth token to use in Postman
* [Sample MS Graph Node app](https://github.com/microsoftgraph/msgraph-sample-nodeexpressapp)
* [How to register your app to use Azure auth](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
* [MS Graph API homepage](https://developer.microsoft.com/en-us/graph/rest-api)
* [Tutorial: Calling an Azure AD secured API with Postman](https://dev.to/425show/calling-an-azure-ad-secured-api-with-postman-22co)
* [Tutorial: Call MS Graph in a console app](https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-nodejs-console)
* [Tutorial: Node.js & Express web app calling Microsoft Graph using MSAL Node](https://github.com/Azure-Samples/ms-identity-javascript-nodejs-tutorial/blob/main/2-Authorization/1-call-graph/README.md)

