const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");

class Book {
  static bookCollection() {
    return database.collection("books");
  }

  static async getBooks() {
    const books = await this.bookCollection().find({}).toArray();
    return books;
  }

  static async getBookById(id) {
    const book = await this.bookCollection().findOne({
      _id: new ObjectId(String(id)),
    });
    return book;
  }

  static async addBook(book) {
    const result = await this.bookCollection().insertOne(book);
    return result;
  }
}
