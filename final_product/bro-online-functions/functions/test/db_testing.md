[index.online.test.ts](https://cseegit.essex.ac.uk/ce301_2020/ce301_rai_ajaya/-/blob/master/final_product/bro-online-functions/functions/test/index.online.test.ts) includes the code for the testing.

The test fuction <b>Testing deletion of a group</b> tests the functionality of deleting all the group members if a group was deleted. 

This is done by firstly, creating 3 users who are in the same group. Using a DELETE request to the server so that the group is deleted, and in the end, checks are made to ensure that all the users are deleted along with the group.

Please note that there is a <b>tokenn</b> variable which has string 'X', this needs to be changed to the valid token. You can obtain the token from the Chrome Developer Tools after you have logged in as a valid user. 
