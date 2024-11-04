const fs = require('fs-extra');
const path = require('path');
const userDataPath = path.join(__dirname, '../data/users.json');

const followUser = async (req, res) => {
    const { userId } = req.params;
    const { followerId } = req.body;

    const users = await fs.readJSON(userDataPath);
    const user = users.find(user => user.id === userId);
    const follower = users.find(user => user.id === followerId);

    if (!user || !follower) {
        return res.status(404).send({ message: 'User not found' });
    }

    if (!user.followers.includes(followerId)) {
        user.followers.push(followerId);
        follower.following.push(userId);
    }

    await fs.writeJSON(userDataPath, users);
    res.send({ message: 'Followed successfully' });
};

module.exports = {
    followUser
};
