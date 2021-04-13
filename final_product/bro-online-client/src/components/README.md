# Adding a group #

The user must be logged in to add groups, and it can be done on the home page.

Simply, type the group name and click submit. When you do this, the name of the group is sent to the server with a POST request. Code for this part can be seen [here](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/blob/master/final_product/bro-online-client/src/components/AddInterest.js).

[Click here](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/edit/master/final_product/bro-online-functions/functions/README.md) to see what happens after the POST request has been sent to the backend.

# Deleting a group #

The user must be logged in to delete a group, and it can be done on the home page.

User must have at least one group in order to see the "Delete" button which appears next to the each groups. Once the user presses the delete button <i>handleClick</i> function on the [RmvGroupBtn,js](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/blob/master/final_product/bro-online-client/src/components/RmvGroupBtn.js) is executed.
The <i>handleClick</i> fuction sends a DELETE request to the server along with the group ID. Please click [here](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/edit/master/final_product/bro-online-functions/functions/README.md) to follow the process.
