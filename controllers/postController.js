const fs = require('fs-extra');
const path = require('path');
const postDataPath = path.join(__dirname, '../data/posts.json');
const userDataPath = path.join(__dirname, '../data/users.json');

const createPost = async (req, res) => {
    const { title, description, authorId } = req.body;
    
    const posts = await fs.readJSON(postDataPath);
    const newPost = {
        id: uuidv4(),
        title,
        description,
        authorId,
        likes: 0,
        comments: []
    };

    posts.push(newPost);
    await fs.writeJSON(postDataPath, posts);
    res.status(201).send({ message: 'Post created successfully', post: newPost });
};

const getPosts = async (req, res) => {
    const posts = await fs.readJSON(postDataPath);
    res.send(posts);
};

// Add other functions as needed (like, comment, delete, etc.)

module.exports = {
    createPost,
    getPosts
};
