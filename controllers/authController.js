const fs = require('fs-extra');
const path = require('path');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const userDataPath = path.join(__dirname, '../data/users.json');

const registerUser = async (req, res) => {
    const { email, password, mobile } = req.body;

    // Check for duplicity
    const users = await fs.readJSON(userDataPath);
    const existingUser = users.find(user => user.email === email || user.mobile === mobile);
    if (existingUser) {
        return res.status(400).send({ message: 'Email or mobile number already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
        id: uuidv4(),
        email,
        password: hashedPassword,
        mobile,
        following: [],
        followers: []
    };
    
    users.push(newUser);
    await fs.writeJSON(userDataPath, users);

    res.status(201).send({ message: 'User registered successfully' });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const users = await fs.readJSON(userDataPath);
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).send({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send({ message: 'Invalid email or password' });
    }

    res.send({ message: 'Login successful', user: { email: user.email, id: user.id } });
};

module.exports = {
    registerUser,
    loginUser
};
