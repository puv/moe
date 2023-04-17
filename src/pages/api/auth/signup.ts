import User from '@/database/models/User';
import dbConnect from '@/lib/dbConnect';
import handler from '@/lib/handler';
import bcrypt from 'bcrypt'

handler.post(createUser)

async function createUser(req: any, res: any) {

    const data = req.body;

    const { username, email, password } = data;

    dbConnect();

    const Id = (await User.countDocuments()) + 1;

    const user = await User.create({
        id: Id,
        public: {
            username: username,
        },
        private: {
            email: email,
            password: await bcrypt.hash(password, 10),
        },
    });

    res.status(201).json({ message: 'Created user!' });

}

export default handler;