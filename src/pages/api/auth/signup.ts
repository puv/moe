import User from '@/database/models/User';
import dbConnect from '@/lib/dbConnect';
import handler from '@/lib/handler';


handler.post(createUser)

async function createUser(req: any, res: any) {

    const data = req.body;

    const { username, email, password } = data;

    dbConnect();

    const user = await User.create(req.body)

    res.status(201).json({ message: 'Created user!' });

}

export default handler;