const fs = require('fs-extra');
const path = require('path');
const userDataPath = path.join(__dirname, '../data/users.json');

class User {
    constructor(email, password, mobile) {
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.following = [];
        this.followers = [];
    }

    static async findByEmail(email) {
        const users = await fs.readJSON(userDataPath);
        return users.find(user => user.email === email);
    }

    // Other user-related methods can go here
}

module.exports = User;
