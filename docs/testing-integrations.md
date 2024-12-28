## Testing MS Graph endpoints

1. In the Azure portal > Authentication, ensure you have two web redirect URIs:
    - Your application, e.g., `http://localhost:3001/auth/callback`
    - Postman: `https://oauth.pstmn.io/v1/callback`
2. In Postman, in the Authorization tab, choose OAuth2 and select to add auth data to request headers.
3. Below is a full example of the settings; noting that the variables are saved in a [Postman environment](https://learning.postman.com/docs/sending-requests/environments/managing-environments/) for easy re-use. Select the environment to work in the top right of the screen (it's called LifeScreen here).

![MS Graph Postman example](https://github.com/doubleedesign/life-screen/blob/version-2/docs/public/postman_msgraph.png?raw=true)

Tips:
- **Invalid audience error**: Go to the [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) and log in. Copy the access token shown into the "current token" field in Postman.

## Testing Google Calendar endpoints

1. In the [Credentials](https://console.cloud.google.com/apis/credentials?project=life-screen) screen, ensure you have two web redirect URIs:
    - Your application, e.g., `http://localhost:3001/auth/callback`
    - Postman: `https://oauth.pstmn.io/v1/callback`
2. In Postman, in the Authorization tab, choose OAuth2 and select to add auth data to request headers.
3. Below is a full example of the settings; noting that the variables are saved in a [Postman environment](https://learning.postman.com/docs/sending-requests/environments/managing-environments/) for easy re-use.

![Google Postman example](https://github.com/doubleedesign/life-screen/blob/version-2/docs/public/postman_google.png?raw=true)

