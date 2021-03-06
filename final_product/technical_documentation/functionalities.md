# Sign-up #

if you go to the site's homepage without logging in, you will be redirected to the 'sign up' page. Shown below:

Once you typed all the details and click submit. The details will be sent to the backend which receives the details and uploads it onto the firestore. See below:

Then the backend generates and sends a token to the frontend. After the submition of the details, you will be directed to the homepage. Shown below:

Note that you can access the homepage and now can do all things that the web app offers due to the token.

For example, lets say you wanted to create a group. In simplist form, the group name and the token will get sent to the backend, which checks if the token is validate and only then allows the group to be created.
