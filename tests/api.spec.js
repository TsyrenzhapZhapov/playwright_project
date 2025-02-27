import { test, expect} from '@playwright/test';
import { request } from 'http';
import { faker } from '@faker-js/faker';

test.describe.serial('Go rest', () => {
    const randomEmail = faker.internet.email();
    const randomGender = faker.person.sex();
    const randomName = randomGender === 'male' ? faker.person.fullName('male') : faker.person.fullName('female');
    const goRestHeaders = { 'Authorization': `Bearer ${process.env.TOKEN}`};
   
    let userId;

    test('should get users list', async ({ request }) => {
        const response = await request.get(process.env.REST_URL, {
            params: {},
            headers: goRestHeaders
        });
        const data = await response.json();
        const filterData = data.map(user => ({
            name: user.name,
            status: user.status
        }));
        expect(response.status()).toEqual(200);
        expect(response.statusText()).toEqual('OK');

    });

    test('create user',async ({ request }) => {
        const response = await request.post(process.env.REST_URL, {
            headers: goRestHeaders,
            data: {
                'name': randomName,
                'gender': randomGender,
                'email': randomEmail,
                'status': 'active'
            }
        });
        const data = await response.json();
        expect(response.status()).toEqual(201);
        expect(response.statusText()).toEqual('Created');
        expect(data).toHaveProperty('id');
        expect(data.email).toEqual(randomEmail);

        userId = data.id;
    });

    test('update(patch) user by id', async ({ request }) => {
        expect(userId).toBeDefined();
        const response = await request.patch(`${process.env.REST_URL}/${userId}`, {
            headers: goRestHeaders,
            data: {
                'name': randomName,
                'gender': randomGender
            }
        });
        const data = await response.json();
        expect(response.status()).toEqual(200);
        expect(response.statusText()).toEqual('OK');

    });

    test('update(put) user by id', async ({ request }) => {
        expect(userId).toBeDefined();
        const response = await request.put(`${process.env.REST_URL}/${userId}`, {
            headers: goRestHeaders,
            data: {
                'name': randomName,
                'gender': randomGender,
                'email': randomEmail,
                'status': 'active'
            }
        });
        const data = await response.json();
        expect(response.status()).toEqual(200);
        expect(response.statusText()).toEqual('OK');

    });

    test('the created user must be deleted', async ({ request }) => {
        expect(userId).toBeDefined();
        const response = await request.delete(`${process.env.REST_URL}/${userId}`, {
            headers: goRestHeaders,
        });
        expect(response.status()).toEqual(204);
        expect(response.statusText()).toEqual('No Content');
    });

    test('validate the removed user is unexisted', async({ request }) => {
        const response = await request.get(`${process.env.REST_URL}/${userId}`, {
            headers: goRestHeaders
        });
        expect(response.status()).toEqual(404);
        expect(response.statusText()).toEqual('Not Found');
    });

})