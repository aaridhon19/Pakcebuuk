const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");

class Post {
  static postCollection() {
    return database.collection("Posts");
  }

  static async getAllPosts() {
    const posts = await this.postCollection().find({}).toArray();
    return posts;
  }
  static async getPostById(id) {
    const post = await this.postCollection().findOne({
      _id: new ObjectId(String(id)),
    });
    return post;
  }

  static async createPost(post) {
    const result = await this.postCollection().insertOne(post);
    return result;
  }

  static async updatePost(id, post) {
    const result = await this.postCollection().updateOne(
      {
        _id: new ObjectId(String(id)),
      },
      { $set: post }
    );
    return result;
  }

  static async deletePost(id) {
    const result = await this.postCollection().deleteOne({
      _id: new ObjectId(String(id)),
    });
    return result;
  }

  static async likePost(id, username) {
    const post = await this.getPostById(id);
    if (!post.likes.includes(username)) {
      post.likes.push(username);
    } else {
      post.likes = post.likes.filter((like) => like !== username);
    }
  }

  static async unlikePost(id, username) {
    const post = await this.getPostById(id);
    post.likes = post.likes.filter((like) => like !== username);
    const result = await this.postCollection().updateOne(
      {
        _id: new ObjectId(String(id)),
      },
      {
        $set: { likes: post.likes },
      }
    );
    return result;
  }

  static async addComment(id, comment) {
    const post = await this.getPostById(id);
    post.comments.push(comment);
    const result = await this.postCollection().updateOne({
      _id: new ObjectId(String(id)),
    });

    return result;
  }
  
}

module.exports = Post;
