# Technical documentation

## Project Objective

The objective of the project is to build a website targeted towards male audience, which enables the user to create groups based on the individual work or interest. For example: a person could have hobbies such as GYM, coding, MMA; each of these hobbies can have its own group with different/same members in it.
A user should be able to join/leave groups as they please. 

### Flow Chart of the current product
![](images/flowChart.png)

### Backend
For backend, I have used 'Firebase', its a platform created by Google for developing mobile and web application. 

It offers multiple services;
![](images/fireBaseServices.png)

I will be using:
- Cloud Firestore - real-time database, NoSQL document based
- Cloud Functions
- Authentication

If you would like more detailed description of the services above, then please click [here](https://firebase.google.com/products#develop-products).

###### Database structure

User Collection:

![](images/dbUsers.png)

Interests Collection (within User Collection):

![](images/dbInterests.png)

Group Collection:

![](images/dbGroups.png)

### Frontend
React is a library for building component based web application.
Complimenting it with;
- react-router-dom
- axios
