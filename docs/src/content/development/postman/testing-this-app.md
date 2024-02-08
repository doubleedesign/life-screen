### Testing this app's endpoints in Postman

Because the Express app saves user info, including tokens, in a session using [express-session](https://www.npmjs.com/package/express-session), logging in to the various third-party services as per the below instructions for their own endpoints does nothing for the local endpoints.

I have so far found the easiest way to test the app's endpoints in Postman is to:
1. Log into the services I want to test using the app endpoints in the browser (e.g., http://localhost:3001/msgraph/auth/login and http://localhost:3001/gcal/auth/login)
2. With the browser's dev tools open, go to http://localhost:3001
3. In the Network tab, grab the session cookie value from the request headers:
   ![Cookie in the request headers in the browser](https://github.com/doubleedesign/life-screen/blob/version-2/docs/public/session_cookie_example_part_1.png?raw=true)

4. Paste it into the request headers for your app endpoint request in Postman
   ![Cookie in the request headers in Postman](https://github.com/doubleedesign/life-screen/blob/version-2/docs/public/session_cookie_example_part_2.png?raw=true)
   (or add it as an environment variable and use that in the headers)
5. Requests to `localhost:3001` endpoints that require the logged-in values stored in the current session should now work.

