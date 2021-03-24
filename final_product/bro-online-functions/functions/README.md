# Adding group members #

Once the client sends the post request from the [frontend](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/tree/master/final_product/bro-online-client/src/pages), the code below is triggered:

    app.post('/add_member', FBAuth, (req, res) => {...}

You can find the full code on the [index.js]().

The function above does two things:
1. Adds the user to the group
2. Adds the group to the user's collection
Please see the image below to understand this concept better:<br>

<img src="final_product/bro-online-functions/functions/technicalDoc_img/addGroupMem_1.png" alt="drawing" width="400"/><br>
<img src="final_product/bro-online-functions/functions/technicalDoc_img/addGroupMem_2.png" alt="drawing" width="400"/><br>

The two changes need to take place so that we can keep track of the group members on a given group, and the group member's individaul groups.
