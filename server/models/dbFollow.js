const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");
const {redis} = require("../config/redis");

class Follow {
  static followCollection() {
    return database.collection("Follow");
  }

  static async createFollow(payload) {
    const newFollow = await this.followCollection().insertOne(payload);
    return newFollow;
  }

  static async findAll() {
    const redisFollows = await redis.get("Follow");
    if (redisFollows) {
      return JSON.parse(redisFollows);
    } else {
      const agg = [
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "followerId",
            foreignField: "_id",
            as: "follower"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "followingId",
            foreignField: "_id",
            as: "following"
          }
        },
        {
          $unwind: {
            path: "$follower",
            preserveNullAndEmptyArrays: true
          }
        }
      ];
      const cursor = this.followCollection().aggregate(agg);
      const result = await cursor.toArray();
      await redis.set("Follow", JSON.stringify(result));
      return result;
    }
  }
}

module.exports = Follow;