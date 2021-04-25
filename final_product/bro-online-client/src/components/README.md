# Adding a group #

The user must be logged in to add groups, and it can be done on the home page.

Simply, type the group name and click submit. When you do this, the name of the group is sent to the server with a POST request. Code for this part can be seen [here](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/blob/master/final_product/bro-online-client/src/components/AddInterest.js).

[Click here](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/tree/master/final_product/bro-online-functions/functions) to see what happens after the POST request has been sent to the backend.

# Deleting a group #

The user must be logged in to delete a group, and it can be done on the home page.

User must have at least one group in order to see the "Delete" button which appears next to the each groups. Once the user clicks the delete button <i>handleClick</i> function on the [RmvGroupBtn,js](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/blob/master/final_product/bro-online-client/src/components/RmvGroupBtn.js) is executed.
The <i>handleClick</i> fuction sends a DELETE request to the server along with the group ID. Please click [here](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/tree/master/final_product/bro-online-functions/functions) to follow the process.

# Profile Image #
<i>Image upload functionality has not been completed.</i> But, the parts below has been completed:
- Once a user is signed up “no image” icon is given to the user, which is a url to the firebase storage which was manually added in the beginning. If we look into the firestore on a newly signed up user we see the url to the “no image” picture, as shown below: <br>
<img src="final_product/bro-online-client/technicalDoc_img/newUser_noImgUrl.png" alt="drawing" width="400"/><br>

Please note that the image persist on different website due to the Redux, which has been described in the Redux section.
Currently, if you want to change the personal profile image, you have to manually upload the image and url to the firebase.

# Bio #

The user can Edit the Bio on the Group Page. To add something to the Bio, simply type and click submit. This will trigger the <i>handleSubmit</i> function in the [BioOfGrp.js](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/blob/master/final_product/bro-online-client/src/components/BioOfGrp.js), which sends POST request to the backend with group ID on the URL and along with the text that was written:

    axios   
        .post(`/group_bio/${this.props.groupDocId}`, {bio: this.state.value})

Note that what was typed just before clicking the Submit button persists, so it is not necessary to check the database and change the Bio on the Frontend. Bio data is pulled from the Firestore only when the page is refreshed.

Please click [here](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/tree/master/final_product/bro-online-functions/functions) to follow the process in the backend.


