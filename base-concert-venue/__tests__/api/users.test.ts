import { testApiHandler } from 'next-test-api-route-handler';
import usersHandler from '@/pages/api/users/index';
import userReservationHandler from '@/pages/api/users/[userId]/reservations';

jest.mock('@/lib/auth/utils');

describe('test for users', () => {
    it('POST /api/users receives token with correct credentials', async () => {
        await testApiHandler({
            handler: usersHandler,
            test: async ({ fetch }) => {
                const res = await fetch({ 
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json', // MUST
                    },
                    body: JSON.stringify({
                        email: 'test@test.test',
                        password: 'test'
                    })
                });
                expect(res.status).toBe(200);

                const json = await res.json();
                expect(json).toHaveProperty('user');
                expect(json.user.id).toEqual(1);
                expect(json.user.email).toEqual('test@test.test');
            }
        });
    });

    it('GET /api/users/[userId]/reservations receives correct no of reservations', async () => {
        await testApiHandler({
            handler: userReservationHandler,
            paramsPatcher: (params) => {
                params.userId = 1;
            },
            test: async ({ fetch }) => {
                const res = await fetch({
                    method: 'GET'
                });
                expect(res.status).toBe(200);

                const json = await res.json();
                expect(json.userReservations).toHaveLength(2);
            }
        });
    });

    it('GET faulty userId"s reservations and return 0', async () => {
        await testApiHandler({
            handler: userReservationHandler,
            paramsPatcher: (params) => {
                params.userId = 11111;
            },
            test: async ({ fetch }) => {
                const res = await fetch({
                    method: 'GET'
                });
                expect(res.status).toBe(200);

                const json = await res.json();
                expect(json.userReservations).toHaveLength(0);
            }
        })
    });
});
