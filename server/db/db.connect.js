const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://namrata21:namrata@cluster0.q7eun.mongodb.net/',{
      }
    );
    console.log("connected succesfully");
  } catch (err) {
    console.log("not connected", err);
  }
};

module.exports = {
  connectToDatabase,
};
