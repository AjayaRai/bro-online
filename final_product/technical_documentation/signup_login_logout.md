# Sign-up #

if you go to the site's homepage without logging in, you will be redirected to the 'sign up' page. Shown below:<br>
<img src="final_product/technical_documentation/images/sign_up_pg.png" alt="drawing" width="400"/>

Once you typed all the details and click submit. The details will be sent to the backend which receives the details and uploads it onto the firestore. See below:<br>
<img src="final_product/technical_documentation/images/sign_up_page_detail_fill.png" alt="drawing" width="400"/>

Please note that the details entered on the signup page, will go towards different places. For example: email and password will go to the firebase authentication and rest of the details will be stored on the firestore.<br>
<img src="final_product/technical_documentation/images/firestore_user10.png" alt="drawing" width="400"/><br>
<img src="final_product/technical_documentation/images/auth_user10.png" alt="drawing" width="400"/>


Then the firebase server generates and sends a token to the user's browser. After the submition of the details, you will be directed to the homepage. Shown below:<br>
<img src="final_product/technical_documentation/images/home_page.png" alt="drawing" width="400"/>

If we investigate further you will see the token:<br>
<img src="final_product/technical_documentation/images/token.png" alt="drawing" width="400"/>

Note that you can access the homepage and now can do all things that the web app offers due to the token.

For example, lets say you wanted to create a group. In simplist form, the group name and the token will get sent to the backend, which checks if the token is validate and only then allows the group to be created.

# Login #

If you are visiting the site for the first time or you haven’t logged in, you will be redirected to the sign up page, if you already signed up then you can click on the link. This will lead you to the login page. Shown below:<br>
<img src="final_product/technical_documentation/images/login_pg.png" alt="drawing" width="400"/>

Simply enter your credentials, and then you should be able to use the web app with the token feature as described on the signup section.

# Log out #

In order to log out, you can click on the icon shown on the top right corner:<br>
<img src="final_product/technical_documentation/images/home_page.png" alt="drawing" width="400"/>

This will delete the token, thus the user can no longer can access the site.

