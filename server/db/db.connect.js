const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_STRING, {}
    );
    console.log("connected succesfully");
  } catch (err) {
    console.log("not connected", err);
  }
};

module.exports = {
  connectToDatabase,
};
