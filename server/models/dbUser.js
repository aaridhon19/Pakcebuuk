const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");

class User {
  static userCollection() {
    return database.collection("Users");
  }

  static async findByUsername(username) {
    const user = await this.userCollection().findOne({
      username: username,
    });
    console.log(user, "<<<");
    return user;
  }

  static async findById(id) {
    const user = await this.userCollection().findOne({
      _id: new ObjectId(String(id)),
    });
    return user;
  }

  //Register
  static async createOne(user){
    const result = await this.userCollection().insertOne(user);
    return result
  }

  static async getDetailById(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers.followingId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "following.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      },
      {
        $project: {
          password: 0,
          "followingDetail.password": 0,
          "followerDetail.password": 0,
        },
      },
    ];

    const cursor = this.userCollection().aggregate(agg);
    const result = await cursor.toArray();
    return result[0];
  }
}

module.exports = User;
