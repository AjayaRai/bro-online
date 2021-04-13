# Adding group members #


On the app, go to the group that you created. Then, click a button which says “Add member” which will lead you to a search page from there you can choose people that you want in your group. After you have chosen a person, it will redirect you to the group page and the chosen person would be added to the group.

In order to understand how this happen in the code, please start by looking into the [group.js](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/blob/master/final_product/bro-online-client/src/pages/group.js), which includes the **AddMember** component that redirects the user to the "localhost.com/group/...document ID.../search". The "document ID" is used to identify the group. On the search page, you will see the **Add** button; in coding prespective search page is the [search.js]() and the **Add** button is the component [AddBtn.js]() which is called from the search.js. 
The purpose of the search.js is to display all the registered users, and the component AddBtn purpose is to send a post request to the backend.

On the [AddBtn.js](), you will see the line:<br>

        let jsonFormat = {
            userName: userName,
            docId: docId
        }

        axios
            .post('/add_member', jsonFormat)

If you are not familiar with **axios**, then follow the [link](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/blob/master/final_product/technical_documentation/reactjs.md) to understand it.
The code above sends a post request to the server, with the data "userName" and "docId" of the group.

Please click the [link](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/tree/master/final_product/bro-online-functions/functions) to follow the process to the server.

# Removing group members #


To remove a group member from the web app, you have to go to the group which has members and click on the “Remove” button.

You can view the "Remove" button logic by first going to the [group.js](), then you should find the **Tribe** component and if you view the [Tribe component](), you should find another component [RemoveMemberBtn]().

The **RemoveMemberBtn** has the code for the button and more improtantly, it has a function which is triggered when the button is clicked:

    handleClick = () => {
        let userName = this.props.userName;
        let docId = this.extractDocIdFromURL(window.location.pathname);

        axios
            .delete(`/group/${docId}/groupMember/${userName}`)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.error(err);
            })
    }

Main part on the above code is the;

    axios
        .delete(`/group/${docId}/groupMember/${userName}`)

which sends a delete request to the [backend](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/tree/master/final_product/bro-online-functions/functions) (Please follow this link to understand what the backend does with the given request).


# Search Page #
You can navigate to the <i>Search Page</i> by clicking the search icon from the navigation bar on the top.

Main logic of the <i>Search Page</i> can be found on the [search_grp_bro.js](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/blob/master/final_product/bro-online-client/src/pages/search_grp_bro.js), which sends two seperate GET request to the backend; one to retrieve all the users, and another for retrieving all the groups.

[search_grp_bro.js](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/blob/master/final_product/bro-online-client/src/pages/search_grp_bro.js) also has a component <i>JoinAgrp</i> which purpose is to display a "Join" button that the user can click so that they can join a group.



