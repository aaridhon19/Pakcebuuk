const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");
const { redis } = require("../config/redis");

class Post {
  static postCollection() {
    return database.collection("Posts");
  }

  static async findAll() {
    const redisPosts = await redis.get("Posts");
    if (redisPosts) {
      return JSON.parse(redisPosts);
    } else {
      const agg = [
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
      ];
      const cursor = this.postCollection().aggregate(agg);
      const result = await cursor.toArray();
      await redis.set("Posts", JSON.stringify(result));
      return result;
    }
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
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
    const cursor = this.postCollection().aggregate(agg);
    const result = await cursor.toArray();

    return result;
  }

  static async createOne(post) {
    const newPost = await this.postCollection().insertOne(post);
    await redis.del("Posts");
    return newPost;
  }

  static async updateOne(id, update, username) {
    if (update.likes) {
      const agg = [
        {
          $match: {
            _id: new ObjectId(String(id)),
          },
        },
      ];
      const cursor = this.postCollection().aggregate(agg);
      const result = await cursor.toArray();
      result[0].likes.forEach((item) => {
        if (item.username === username) {
          throw new Error("Already liked");
        }
      });
    }
    const post = await this.postCollection().updateOne(
      { _id: new ObjectId(String(id)) },
      { $push: update }
    );
    if (!post) {
      throw new Error("Post not found");
    }
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
    ];
    const cursor = this.postCollection().aggregate(agg);
    const result = await cursor.toArray();
    return result[0];
  }
}

module.exports = Post;