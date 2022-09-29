const mongoose = require("mongoose");

const DB =
  "mongodb+srv://gauravstr2680:Akshu2680@cluster0.uhynjtf.mongodb.net/mernstack?retryWrites=true&w=majority"

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connnection successfully into database..♻`);
  })
  .catch((err) => {
    console.log(`😣something went wrong in db --- ${err}`);
  });
