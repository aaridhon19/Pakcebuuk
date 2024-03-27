require("dotenv").config();
const { database } = require("../config/mongo");
const { hashPassword } = require("../helpers/bcrypt");

const users = [
  {
    name: "John Doe",
    username: "johndoe",
    email: "john@email.com",
    password: "user1",
    phone: "0817276517251",
    address: {
      street: "Segar",
      city: "Depok 2",
      province: "Jawa Barat",
    },
  },
  {
    name: "Adam R",
    username: "aaridhon",
    email: "adam@email.com",
    password: "user2",
    phone: "081280362230",
    address: {
      street: "Kelapa Dua",
      city: "Depok",
      province: "Jawa Barat",
    },
  },{
    name: "John Doe",
    username: "johndoe",
    email: "john@email.com",
    password: "user1",
    phone: "0817276517251",
    address: {
      street: "Segar",
      city: "Depok 2",
      province: "Jawa Barat",
    },
  },
  {
    name: "Adam R",
    username: "aaridhon",
    email: "adam@email.com",
    password: "user2",
    phone: "081280362230",
    address: {
      street: "Kelapa Dua",
      city: "Depok",
      province: "Jawa Barat",
    },
  },
];

async function seedUsers() {
  const userDB = database.collection("users");
  const newUser = users.map((item) => {
    item.password = hashPassword(item.password);
    item.createdAt = new Date();
    item.updateAt = new Date();
    return item;
  });

  const result = await userDB.insertMany(newUser);
  console.log(result);
}

seedUsers()
