var casual = require('casual');
const connection = require('../config/connection');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

connection.on('error', (err) => err);

const users = [];
const gender = ['M','F']
for (let i = 0; i < 20; i++) {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(casual.password, salt);
    users.push({
      "username": casual.username,
      "password": hash,
      "email": casual.email,
      "private": casual.boolean,
      "weight": Math.floor(Math.random() * 450) + 90,
      "height": Math.floor(Math.random() * 96) + 48,
      "age": Math.floor(Math.random() * 90) + 20,
      "gender": gender[Math.floor(Math.random()*gender.length)],
      "goals": [],
      "exercisePlan": [],
      "mealPlan": [],
      "posts": [],
      "friends": []
    });

}

connection.once('open', async () => {
    await User.collection.insertMany(users);
    process.exit(0);
});