**Function emulator**<br>
On the “Adding group member” part, the firebase function has been mentioned  which triggered when something is changed on the database, the issue with these functions is that once a developer has written the code, it then has to be deployed to the firebase server which then creates the function and stored it like so:
<img src="final_product/technical_documentation/images/firebase_functions.png" alt="drawing" width="400"/>

And this process takes long time; roughly about 7 minutes, which is a problem for the developer who has to make small changes and check if it is working iteratively. So, the 7 minutes adds up very quickly.

And that is why the emulator is used, the emulator will run on your local machine, and all the changes that you make to the function will get detected on the real-time without the need for the deployment.

To step up the emulator, please follow steps below:
1. Open a terminal on the project directory, enter "firebase init emulators"
2. Then, you will get the options, shown on the image: <img src="final_product/technical_documentation/images/firebase_emulator_i_options.png" alt="drawing" width="500"/>
3. Make sure that you select the "function" and "firsestore", you can select with space key
4. Then, you will be given options which you can just put "yes" for all of them 
5. Once you have followed the steps about, you can now type "firebase emulators:start"
6. You should get this on the terminal: <img src="final_product/technical_documentation/images/firebase_emulator_setup_success.png" alt="drawing" width="400"/>

# Reference #
https://youtu.be/UDMDpdu5-rE

