const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");

class Follow {
  static followCollection() {
    return database.collection("Follow");
  }

  static async followUser(followerId, followingId) {
    const result = await this.followCollection().insertOne({
      followerId: followerId,
      followingId: followingId,
    });
    return result;
  }

  static async unfollowUser(followerId, followingId) {
    const result = await this.followCollection().deleteOne({
      followerId: followerId,
      followingId: followingId,
    });
    return result;
  }

  static async getFollowers(userId) {
    const followers = await this.followCollection()
      .find({ followingId: userId })
      .toArray();
    return followers;
  }

  static async getFollowings(userId) {
    const followings = await this.followCollection()
      .find({ followerId: userId })
      .toArray();
    return followings;
  }

  static async checkFollowStatus(followerId, followingId) {
    const result = await this.followCollection().findOne({
      followerId: followerId,
      followingId: followingId,
    });
    return result ? true : false;
  }
}

module.exports = Follow