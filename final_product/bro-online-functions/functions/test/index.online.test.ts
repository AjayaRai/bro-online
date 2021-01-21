import 'jest';
import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';

const testEnv = functions({
    databaseURL: 'https://bro-online.firebaseio.com',
    projectId: 'bro-online'
}, './service-account.json');

import * as myFunctions from '../';

const request = require('supertest')

describe('onDeleteOFTheUser', () =>{
    let wrapped: any;

    beforeAll(() => {
        wrapped = testEnv.wrap(myFunctions.rmvMemFromGrp);
    })

    /**
     * If this test failed, then it may due to time delay
     */
    test('Testing \'rmvMemFromGrp\' trigger function', async () => {
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

    test('Testing deletion of a group', async () => {
        jest.setTimeout(60000);

        // create users for testing and their same interest
        let user999 = "users/user999/interests/interest999";
        let user998 = "users/user998/interests/interest999";
        let user997 = "users/user997/interests/interest999";

        await admin.firestore().doc(user999).create({name: "BJJ"});
        await admin.firestore().doc(user998).create({name: "BJJ"});
        await admin.firestore().doc(user997).create({name: "BJJ"});

        // assign users to the groupId: interest999
        let grpMemUsr999 = "groups/interest999/groupMembers/user999";
        let grpMemUsr998 = "groups/interest999/groupMembers/user998";
        let grpMemUsr997 = "groups/interest999/groupMembers/user997";

        await admin.firestore().doc(grpMemUsr999).create({userName: "user999"});
        await admin.firestore().doc(grpMemUsr998).create({userName: "user998"});
        await admin.firestore().doc(grpMemUsr997).create({userName: "user997"});

        const res = await request('http://localhost:5000/bro-online/europe-west2/api')
            .delete('/group/interest999')
            .set('Authorization', 'Bearer ' + tokenn);

        expect(res.statusCode).toEqual(200);

        await sleeep(20000);

        let pathToDeletedGroup = "groups/interest999"
        const deletedGroup = await admin.firestore().doc(pathToDeletedGroup).get();

        expect(deletedGroup.exists).toBe(false);

        const delUser999 = await admin.firestore().doc(user999).get();
        const delUser998 = await admin.firestore().doc(user998).get();
        const delUser997 = await admin.firestore().doc(user997).get();

        expect(delUser999.exists).toBe(false);
        expect(delUser998.exists).toBe(false);
        expect(delUser997.exists).toBe(false);
    })
})

function sleeep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let tokenn = 'X';

