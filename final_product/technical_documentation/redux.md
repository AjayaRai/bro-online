# Redux #

Redux is used so that all the components (similar to objects in OOP) have access to the global variables. For the web-app, following things are set as global:
- Image of the redux 

Because of the redux, a user’s image avatar is shown on different pages without the need to ask the server each time, the user navigates to the different pages.

### How does Redux work? ###
<img src="final_product/technical_documentation/images/redux_diagram.png" alt="drawing" width="400"/> [1]<br>
Steps include: [2]
1. User click a button or submits a form which triggers event 
2. Event fires up action
3. Action dispatches action type or sometimes along with the action type, payload is also dispatched
4. Type will be recieved by the Reducer
5. Reducer decides what to do with the type and how to change the state
6. Once the state is changed, all of the application is aware of the state


### Reference ###
[1] https://www.toptal.com/javascript/immutability-in-javascript-using-redux <br>
[2] https://www.youtube.com/watch?v=m_u6P5k0vP0 (6:05:16​) Explaination is give on how the Redux works
