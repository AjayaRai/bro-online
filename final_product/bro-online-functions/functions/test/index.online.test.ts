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

const request = require('supertest')
describe('Test for learning \'how to test the express\'', () => {
    test('', async () => {
        const res = await request('http://localhost:5000/bro-online/europe-west2/api')
            .get('/users')
            .set('Authorization', 'Bearer ' + tokenn);
        //expect(res.statusCode).toEqual(201)
        //expect(res.body).toHaveProperty('post')
        console.log(res.body);
    })
})

let tokenn = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImEyYjkxODJiMWI0NmNiN2ZjN2MzMTFlZTgwMjFhZDY1MmVlMjc2MjIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnJvLW9ubGluZSIsImF1ZCI6ImJyby1vbmxpbmUiLCJhdXRoX3RpbWUiOjE2MTExNzc5OTksInVzZXJfaWQiOiJYZ21udHpmQTFaUnZEZzVZb2lRZWN0MXpGZG8yIiwic3ViIjoiWGdtbnR6ZkExWlJ2RGc1WW9pUWVjdDF6RmRvMiIsImlhdCI6MTYxMTE3Nzk5OSwiZXhwIjoxNjExMTgxNTk5LCJlbWFpbCI6InVzZXIxMEBlbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidXNlcjEwQGVtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.GKrAONfAsYzIYrfF_raaN1xJ2djoz9TxeDjI7R0qwsA6cuayC_eVyVfb9f9t79-NkBzKqsBhEAYceLlcCpPkdt0DoIwp1h2NxMYWOf04MB-hvAAY06YtobToSuM5RGuGWiNsUs7yhfsqwaOS3jG6bxR_5wWMyvZKhgUd6nvkkW2w_9gLP6vMehRDrgo1owLnwJmZNuKUnNUBlMYUR-9auHpUi3U0Lz1JoAOdkQZCUjfsCOx9u4yH-gslh3Jukw1Z9lzvs6vwLOQ3EdVRDPU4569ouRuFo4bAVpVNZBdUwu6Ol67O1NSL903CEhfwucNAe5ZNipa_NvzdqNYqACbrIQ';

