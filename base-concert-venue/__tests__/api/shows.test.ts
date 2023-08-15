import { testApiHandler } from 'next-test-api-route-handler';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import showIdHandler from '@/pages/api/shows/[showId]';
import showsHandler from '@/pages/api/shows/index';

describe('test for shows', () =>{
    it('GET /api/shows returns shows from DB', async () => {
        await testApiHandler({
            handler: showsHandler,
            test: async ({ fetch }) => {
                const res = await fetch({ method: 'GET' });
                expect(res.status).toBe(200);

                const json = await res.json();
                const { fakeShows } = await readFakeData();
                expect(json).toEqual({ shows: fakeShows });
            }
        });
    });

    it('GET /api/shows/[showid] returns show from DB', async () => {
        await testApiHandler({
            handler: showIdHandler,
            paramsPatcher: (params) => {
                params.showId = 0;
            },
            test: async ({ fetch }) => {
                const res = await fetch({ method: 'GET' });
                expect(res.status).toBe(200);

                const json = await res.json();
                const { fakeShows } = await readFakeData();
                expect(json).toEqual({ show: fakeShows[0] });
            }
        });
    });

    it("POST /api/shows create a new show", async () => {
        await testApiHandler({
            handler: showsHandler,
            paramsPatcher: (params) => {
                params.queryStringURLParams = { secret: "NOT_SECRET" };
            },
            test: async ({ fetch }) => {
                const res = await fetch({ 
                    method: 'POST',
                });
                expect(res.status).toBe(401);
            }
        });
    });
});
