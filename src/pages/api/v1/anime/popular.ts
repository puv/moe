import dbConnect from '@/lib/dbConnect';
import handler from '@/lib/handler';
import Anime from '@/database/models/Anime'

handler.get(Popular)

async function Popular(req: any, res: any) {

    dbConnect();

    const popular = await Anime.find({}, null, {
        limit: req.query.limit || 25,
    });

    res.status(201).json(popular);

}

export default handler;