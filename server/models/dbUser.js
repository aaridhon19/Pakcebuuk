const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");

class User {
  static userCollection() {
    return database.collection("Users");
  }

  static async findByUsernameOrName(usernameOrName) {
    const agg = [
      {
        $match: {
          $or: [
            { name: { $regex: usernameOrName, $options: "i" } },
            { username: { $regex: usernameOrName, $options: "i" } },
          ],
        },
      },
    ];
    const user = this.userCollection().aggregate(agg);
    const result = await user.toArray();
    return result;
  }

  static async findByUsername(username) {
    const user = await this.userCollection().findOne({
      username: username,
    });
    return user;
  }

  static async findByEmail(email) {
    const user = await this.userCollection().findOne({
      email: email,
    });
    console.log(user, "<<<");
    return user;
  }

  static async findById(id) {
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
          foreignField: "followerId",
          as: "followingList",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followingList.followingId",
          foreignField: "_id",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followerList",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followerList.followerId",
          foreignField: "_id",
          as: "follower",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "authorId",
          as: "posts",
        },
      },
      {
        $project: {
          password: 0,
          "following.password": 0,
          "follower.password": 0,
        },
      },
    ];
    const user = this.userCollection().aggregate(agg);
    const result = await user.toArray();
    console.log(result, "<<<");
    return result[0];
  }

  //Register
  static async createOne(user) {
    const result = await this.userCollection().insertOne(user);
    return result;
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
