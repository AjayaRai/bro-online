# Adding group members #

On the app, go to the group that you created. Then, click a button which says “Add member” which will lead you to a search page from there you can choose people that you want in your group. After you have chosen a person, it will redirect you to the group page and the chosen person would be added to the group.

In order to understand how this happen in the code, please start by looking into the [group.js](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/blob/master/final_product/bro-online-client/src/pages/group.js), which includes the **AddMember** component that redirects the user to the "localhost.com/group/...document ID.../search". The "document ID" is used to identify the group. On the search page, you will see the **Add** button; in coding prespective search page is the [search.js]() and the **Add** button is the component [AddBtn.js]() which is called from the search.js. 
The purpose of the search.js is to display all the registered users, and the component AddBtn purpose is to send a post request to the backend.

On the [AddBtn.js](), you will see the line:
        __let jsonFormat = {
            userName: userName,
            docId: docId
        }

        axios
            .post('/add_member', jsonFormat)__
If you are not familiar with **axios**, then follow the [link](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/blob/master/final_product/technical_documentation/overview_of_tools.md) to understand it.
The code above sends a post request to the server, with the data "userName" and "docId" of the group.

Please note that on the backend, two things happen:
1. Group member collection (table in relational db equivalent) will record the new member
2. X function will get triggered by the first step. Here we are utilise the firebase function, which helps us to add the group on the new members profile when he/she is added to the group
Show the imgs of the group member db and the interest which is the person’s profile
