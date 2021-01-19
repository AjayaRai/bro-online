import 'jest';
import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';

const testEnv = functions({
    databaseURL: 'https://bro-online.firebaseio.com',
    projectId: 'bro-online'
}, './service-account.json');

import * as myFunctions from '../';

describe('onDeleteOFTheUser', () =>{
    let wrapped: any;

    beforeAll(() => {
        wrapped = testEnv.wrap(myFunctions.rmvMemFromGrp);
    })

    /**
     * If this test failed, then it may due to time delay
     */
    test('test 1', async () => {
        jest.setTimeout(100000);

        let usersPath = "users/user1/interests/interest1";
        let groupsPath = "groups/interest1/groupMembers/user1";

        // create group & user
        await admin.firestore().doc(groupsPath).create({name: "BJJ"});
        await admin.firestore().doc(usersPath).create({name: "AJ"});

        const userSnap = await admin.firestore().doc(usersPath).get();
        expect(userSnap.exists).toBe(true);

        await admin.firestore().doc(groupsPath).delete();

        // NOTE on here I could just call wrapped(above line inside it); which should just run the function, which means I may not have to deploy the function in order to test it on live

        await sleeep(60000); // It take the time for the DB function to be executed; so this delay is for that

        const afterUserSnap = await admin.firestore().doc(usersPath).get();
        expect(afterUserSnap.exists).toBe(false);
    })
})

function sleeep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

