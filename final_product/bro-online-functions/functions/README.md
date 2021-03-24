# Adding group members #

Once the client sends the post request from the [frontend](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/tree/master/final_product/bro-online-client/src/pages), the code below is triggered:

    app.post('/add_member', FBAuth, (req, res) => {...}

You can find the full code on the [index.js](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/edit/master/final_product/bro-online-functions/functions/index.js).

The function above does two things:
1. Adds the user to the group
2. Adds the group to the user's collection
Please see the image below to understand this concept better:<br>

<img src="final_product/bro-online-functions/functions/technicalDoc_img/addGroupMem_1.png" alt="drawing" width="400"/><br>
<img src="final_product/bro-online-functions/functions/technicalDoc_img/addGroupMem_2.png" alt="drawing" width="400"/><br>

The two changes need to take place so that we can keep track of the group members on a given group, and the group member's individaul groups.

# Removing group members #
Once the frontend send the delete request, the function below is triggered:

    app.delete('/group/:groupId/groupMember/:userId', FBAuth, (req, res) => {...})

You can find the function above on the [index.js](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/edit/master/final_product/bro-online-functions/functions/index.js).<br>

<ins>**What does the function do?**</ins><br>
The function deletes the user from the group collection. It identifies the user and the group by their ID.

Once the user is deleted from the group collection on the firestore, the "rmvMemFromGrp" firebase function is triggered.<br>
Please [click here](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/blob/master/final_product/technical_documentation/firebase.md) if you do not know about the Firebase Function AKA Cloud Function.

You can find the code for this function on the [index.js](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/edit/master/final_product/bro-online-functions/functions/index.js), which has the format:

    exports.rmvMemFromGrp = functions...

This function is triggers automatically when a user is deleted from the group collection. The purpose of the function is to delete the group from the user's record who was removed from the group. The reason why we have to delete two things here is that, if you look into the **Adding group members** section, we created records on two places so when we are removing the user, we need to delete these two records.

