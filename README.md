# Life Screen

Using the Microsoft Graph API, Node/Express, and a to-be-decided front-end stack to bring my calendars together (and other things eventually, e.g., weather forecast).

Some of the code is specific to my calendars, e.g., exclusions, renaming, categorisation, front-end styling; but this could all easily be adjusted for use by other individuals. So please feel free to fork the repo and have a go (insert standard disclaimer about no warranty etc etc).

---
## Server

1. Install dependencies:
    ```bash
    npm install
    ```
2. [Set up or update integrations and their credentials](./docs/setup-integrations.md)
3. Run the server locally in dev mode:
    ```bash
   cd server
    ```
    ```bash
    npm run dev
    ```
4. [Test endpoints](./docs/testing-integrations.md) using Postman or similar.

---
## Front-end

To come.


---
## Previous iterations

### Version 1

This version was built when I was juggling a part-time primary job with a teaching job and studying, all of which were a mix of online and in-person. I note it here to showcase the original concept and usage.

The code for this is archived in the `archive/version-1` branch.

![Screenshot 2023-04-14 at 19-57-56 LifeScreen](https://user-images.githubusercontent.com/563583/232013612-7a1128f9-807e-4d4a-a891-a9dc8e2cf842.png)

### Version 2
Version 2, which I started after starting my job at Atlassian, never really took off due to: general time constraints; UI redesign requirements (e.g., some teaching and study-related features not needed anymore or to be temporarily shelved) and plans; and the limitations on sharing my work calendar reducing the immediate usability.