const Cow = require("../models/cow.model");
const mongoose = require("mongoose");
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tuganado";

const cow = [
  {
    number: "81000",
    breed: "brahman",
    weight: "240",
    price: "300",
  },
  {
    number: "8299",
    breed: "angus",
    weight: "400",
    price: "450",
  },
  {
    number: "2020",
    breed: "F1",
    weight: "295",
    price: "250",
  },
  {
    number: "1523",
    breed: "carora",
    weight: "245",
    price: "145",
  },
  {
    number: "3040",
    breed: "holstein",
    weight: "300",
    price: "400",
  },
  {
    number: "4936",
    breed: "brahman",
    weight: "350",
    price: "500",
  },
  {
    number: "2098",
    breed: "F1",
    weight: "300",
    price: "600",
  },
  {
    number: "2012",
    breed: "angus",
    weight: "600",
    price: "1200",
  },
  {
    number: "3987",
    breed: "F1",
    weight: "345",
    price: "278",
  },
  {
    number: "3456",
    breed: "holstein",
    weight: "445",
    price: "234",
  },
];

mongoose
  .connect(MONGO_URI)
  .then(x => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);

    return Cow.create(cow);
  })
  .then(cowFromDB => {
    console.log(`Created ${cowFromDB.length} cow`);

    return mongoose.connection.close();
  })
  .then(() => {
    console.log("DB connection closed!");
  })
  .catch(err => {
    console.log(`An error occurred while creating books from the DB: ${err}`);
  });
