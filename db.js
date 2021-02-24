const mongoose = require('mongoose');

const db = 'mongodb://localhost:27017/newDb';
const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('connected to database successfully');
    return connect;
  } catch (err) {
    console.error(err.message);
    //exit the process with failure
    //kill the process
    process.exit(1);
  }
};

module.exports = connectToDB;
