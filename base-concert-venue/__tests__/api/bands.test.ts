import { testApiHandler } from 'next-test-api-route-handler';
import bandsHandler from '@/pages/api/bands/index';

it("POST /api/bands create a new show", async () => {
    await testApiHandler({
        handler: bandsHandler,
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