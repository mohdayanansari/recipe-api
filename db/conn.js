const mongoose = require("mongoose");

const DB ="mongodb+srv://ayan:pHTY7jv1Mtrk4SxZ@cluster0.bxchs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
  })
  .then(() => {
    console.log("Connection is successfull to the --Atlas Database-- 🔥");
  })
  .catch((e) => {
    console.log(`Connection Failed ${e}`);
  });

