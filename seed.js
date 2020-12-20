"use strict";

const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber"),
  User = require("./models/user"),
  Course = require("./models/course");

mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection;

// USERS
var users = [
    {
      name: {
        first: "Aindriú",
        last: "Mac Giolla Eoin",
      },
      email: "test@mail.com",
      eirCode: 10016,
      password: "12345",
    },
    {
      name: {
        first: "Chef",
        last: "Eggplant",
      },
      email: "eggplant@recipeapp.com",
      eirCode: 20331,
      password: "12345",
    },
    {
      name: {
        first: "Professor",
        last: "Souffle",
      },
      email: "souffle@recipeapp.com",
      eirCode: 19103,
      password: "12345",
    },
  ],
  courses = [
    {
      title: "Trust the process",
      description:
        "You will be given top quality ingredients -- aged for a year at great loss -- and used to build the potential of the meal.",
      items: ["Persimmons", "Markelle malts", "Embiid spices"],
      eirCode: 19025,
    },
    {
      title: "Democracy muffins",
      description:
        "Although this course does not always have the popular vote, results are bittersweet.",
      items: ["Orange", "Vanilla", "Sour cream"],
      eirCode: 23512,
    },
    {
      title: "One with everything",
      description:
        "This class teaches you a recipe that includes multiple techniques. At the end, you will find enlightment in just ordering food in.",
      items: ["Lotus root", "Lemon grass", "Tofu"],
      eirCode: 43234,
    },
  ];

let createCourse = (c, resolve) => {
  Course.create({
    title: c.title,
    description: c.description,
    items: c.items,
    eirCode: c.eirCode,
  }).then((course) => {
    console.log(`CREATED COURSE: ${course.title}`);
    resolve(course);
  });
};

courses.reduce(
  (promiseChain, next) => {
    return promiseChain.then(
      () =>
        new Promise((resolve) => {
          createCourse(next, resolve);
        })
    );
  },
  Course.remove({})
    .exec()
    .then(() => {
      console.log("Course data is empty!");
    })
);

let createSubscriber = (s, resolve) => {
  Subscriber.create({
    name: `${s.name.first} ${s.name.last}`,
    email: s.email,
    eirCode: s.eirCode,
  }).then((sub) => {
    console.log(`CREATED SUBSCRIBER: ${sub.name}`);
    resolve(sub);
  });
};

users.reduce(
  (promiseChain, next) => {
    return promiseChain.then(
      () =>
        new Promise((resolve) => {
          createSubscriber(next, resolve);
        })
    );
  },
  Subscriber.remove({})
    .exec()
    .then(() => {
      console.log("Subscriber data is empty!");
    })
);

let registerUser = (u, resolve) => {
  User.register(
    {
      name: {
        first: u.name.first,
        last: u.name.last,
      },
      email: u.email,
      eirCode: u.eirCode,
      password: u.password,
    },
    u.password,
    (error, user) => {
      console.log(`USER created: ${user.fullName}`);
      resolve(user);
    }
  );
};

users
  .reduce(
    (promiseChain, next) => {
      return promiseChain.then(
        () =>
          new Promise((resolve) => {
            registerUser(next, resolve);
          })
      );
    },
    User.remove({})
      .exec()
      .then(() => {
        console.log("User data is empty!");
      })
  )
  .then((r) => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(`ERROR: ${error}`);
  });
