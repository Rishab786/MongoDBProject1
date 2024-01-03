
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;


exports.signup = async (request, response, next) => {
    console.log(request.body);
    const { Name, userName, password } = request.body;
    try {
        let userExist = await User.fetchByEmail(userName);
        if (!userExist) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User(Name,userName,hashedPassword);
            const { insertedId } = await user.save();
            const userId = insertedId.toString();
            const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '1h' });
            response.status(200).send({ token: token, user: user });
        } else {
            response.status(401).send(userExist);
        }

    } catch (error) {
        console.log(error);
    }
    
}


exports.login = async (request, response, next) => {
    try {
        const { userName, password } = request.body;
        let userExist = await User.fetchByEmail(userName);
        if (!userExist) {
            response.status(404).send('User not found');
        } else {
            const isPasswordValid = await bcrypt.compare(password, userExist.password);
            if (isPasswordValid) {
                const userId = userExist._id.toString();
                const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '1h' });
                response.status(200).json({ token: token, user: userExist });
            } else {
                response.status(401).send('Authentication failed');
            }
        }


    } catch (error) {
        console.log(error);
        response.status(500).send('error occurred during authentication');
    }
}
