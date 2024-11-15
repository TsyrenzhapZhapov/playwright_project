import { test, expect} from '@playwright/test';
import { request } from 'http';
import { faker } from '@faker-js/faker';

test.describe.serial('Go rest', () => {
    const randomEmail = faker.internet.email();
    let userId;

    test.only('Get users', async ({ request }) => {
        const response = await request.get(process.env.REST_URL, {
            headers: {
                'Authorization': `Bearer ${process.env.TOKEN}`
            },
            params: {}
        });
        const data = await response.json();
        const filterData = data.map(function(user) {
            return {
                name: user.name,
                status: user.status
            };
        });
        expect(response.status()).toEqual(200);
        expect(response.statusText()).toEqual('OK');
        console.log(filterData);
    });

    test('create user',async ({ request }) => {
        const response = await request.post(process.env.REST_URL, {
            data: {
                'name': 'Tom Smith',
                'gender': 'male',
                'email': randomEmail,
                'status': 'active'
            },
            headers: {
                'Authorization': `Bearer ${process.env.TOKEN}`
            }
        });
        const data = await response.json();
        expect(response.status()).toEqual(201);
        expect(response.statusText()).toEqual('Created');
        expect(data).toHaveProperty('id');
        expect(data.email).toEqual(randomEmail);
        console.log(data);

        userId = data.id;
    });

    test('Update user(patch) by id', async ({ request }) => {
        console.log('User ID before update test:', userId);
        expect(userId).toBeDefined();
        const response = await request.patch(`${process.env.REST_URL}/${userId}`, {
            data: {
                'name': 'Tom Tom(patch)',
                'gender': 'male'
            },
            headers: {
                'Authorization': `Bearer ${process.env.TOKEN}`
            }
        });
        const data = await response.json();
        expect(response.status()).toEqual(200);
        expect(response.statusText()).toEqual('OK');
        console.log(data);
    });

    test('Update user(put) by id', async ({ request }) => {
        expect(userId).toBeDefined();
        const response = await request.put(`${process.env.REST_URL}/${userId}`, {
            data: {
                'name': 'Tom Smith(put)',
                'gender': 'male',
                'email': 'tomput@test.test',
                'status': 'active'
            },
            headers: {
                'Authorization': `Bearer ${process.env.TOKEN}`
            }
        });
        const data = await response.json();
        expect(response.status()).toEqual(200);
        expect(response.statusText()).toEqual('OK');
        console.log(data);
    });

    test('delete user by id', async ({ request }) => {
        expect(userId).toBeDefined();
        const response = await request.delete(`${process.env.REST_URL}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.TOKEN}`,
            },
        });
        expect(response.status()).toEqual(204);
        expect(response.statusText()).toEqual('No Content');
    });

    test('get user by id', async({ request }) => {
        const response = await request.get(`${process.env.REST_URL}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.TOKEN}`,
            },
        });
        expect(response.status()).toEqual(404);
        expect(response.statusText()).toEqual('Not Found');
    });

})