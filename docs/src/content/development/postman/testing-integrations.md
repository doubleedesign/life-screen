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

#### Postman environment variables

If using environment variables for MS Graph and/or Google Calendar testing, your Postman environment settings should look something like this:

![Postman environment example](https://github.com/doubleedesign/life-screen/blob/version-2/docs/public/postman_env.png?raw=true)
