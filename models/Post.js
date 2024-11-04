const fs = require('fs-extra');
const path = require('path');
const postDataPath = path.join(__dirname, '../data/posts.json');

class Post {
    constructor(title, description, authorId) {
        this.title = title;
        this.description = description;
        this.authorId = authorId;
        this.likes = 0;
        this.comments = [];
    }

    static async getAllPosts() {
        return await fs.readJSON(postDataPath);
    }

    // Other post-related methods can go here
}

module.exports = Post;
