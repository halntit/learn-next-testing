import type { NextApiRequest, NextApiResponse } from "next";
import { createHandler } from "@/lib/api/handler";

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    if (process.env.APP_ENV !== 'test') {
        return res.status(401)
            .json({"message": "Invalid"});
    }

    if (req.query.secret !== process.env.REVALIDATION_SECRET) {
        return res.status(401)
            .json({"message": "Invalid token"});
    }

    await res.unstable_revalidate("/shows");
    await res.unstable_revalidate("/bands");

    return res.status(200).json({ revalidated: true });
})