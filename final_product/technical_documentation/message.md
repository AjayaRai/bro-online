# Messaging #

The purpose of the message on this app is to plan meet ups, and also come to agreement of the regular sessions.

The chat system works as shown on the gif below: <br>
<img src="final_product/technical_documentation/images/message.gif" alt="drawing" width="400"/>

This has been achieved with the help of Firestore and the ReactJS. Firebase has a function where it listens to any changes on the database and once any changes happen, it detects and send the data to the frontend which updates the messages without needing to refresh the page which is due to the ReactJS.

