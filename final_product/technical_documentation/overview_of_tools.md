# Overview #

The tools that is used for this project include:
- ReactJS + extension libraries:
    - Axios
    - Express Server
    - Material-ui
- Firebase. Specific features used:
    - Cloud Firestore
    - Cloud Functions
    - Authentication
    - Cloud Storage

### Backend/Frontend tools ###
Tools used for the backend:
- Firebase. Specific features used:
    - Cloud Firestore
    - Cloud Functions
    - Cloud Storage
- ReactJS + extension libraries:
    - Express Server

Tools used for the frontend:
- ReactJS + extension libraries:
    - Axios
    - Material-ui
    - Redux
- Firebase. Specific features used:
    - Authentication

# Description of the tools #
#### ReactJS ####
ReactJS is a JavaScript library for building web application. Rather than the conventional way, e.g. having many pages for different parts, ReactJS encourages the Single Page Application. 

Single Page Application is an one page web application which is made up of component. The components can appear and disappear from the browser without needing to refresh the page, and the changes of the components are triggered by the state.
State is similar to a variable that can change depending on the program or the user's action, e.g. click of the button.

#### Axios ####
Axios is a JavaScript library, which can be used alongside the ReactJS.

Main purpose of the Axios is to send the HTTP request from the frontend to the backend.

Please click [here](https://github.com/axios/axios) for the official website 

#### Express ####
Express is a framework which have many functionalities. However, for this project only the HTTP request functions are used.

Main reason for using Express is that it makes the code neater and easier to understand.

E.g.<br>

    // without Express
    exports.helloWord = functions.https.onRequest((request, respond) => {
        respond.send('Hello World');
    });

    // with Express
    app.post('/', (request, respond) => {
        respond.json({'msg': 'Hello World'})
    })

Please click [here](https://expressjs.com/) for the official website 

#### Material-UI ####
Please click [here](https://material-ui.com/) for the official website 

#### Redux ####

Redux is used so that all the components (similar to objects in OOP) have access to the global variables. For the web-app, following things are set as global:
- Image of the redux 

Because of the redux, a user’s image avatar is shown on different pages without the need to ask the server each time, the user navigates to the different pages.

<i> How does Redux work? </i><br>
<img src="final_product/technical_documentation/images/redux_diagram.png" alt="diagram of how Redux works" width="400"/> [1]<br>
Steps include: [2] <br>

1. User click a button or submits a form, which triggers event 
2. Event fires up action
3. Action dispatches action type or sometimes action type and the payload
4. Type will be received by the Reducer
5. Reducer decides what to do with the type and how to change the state
6. Once the state is changed, all of the applications are aware of the state


<i> Reference: </i><br>
[1] https://www.toptal.com/javascript/immutability-in-javascript-using-redux <br>
[2] https://www.youtube.com/watch?v=m_u6P5k0vP0 (6:05:16​) Explaination is give on how the Redux works

#### Firebase ####
Please click [here](https://firebase.google.com/) for the official website 

#### Cloud Firestore ####
Please click [here](https://firebase.google.com/docs/firestore) for the official website 

#### Cloud Functions ####
Please click [here](https://firebase.google.com/docs/functions) for the official website

#### Authentication ####
Please click [here](https://firebase.google.com/docs/auth) for the official website

#### CLoud Storage ####
Please click [here](https://firebase.google.com/docs/storage) for the official website




