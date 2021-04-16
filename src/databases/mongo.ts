import { Mongo } from "@mayajs/mongo";
import users from "../controllers/users/users.model";

export = Mongo({
  name: "test",
  connectionString: "mongodb+srv://mayajs:123456Q@cluster0.tskd6.mongodb.net/test?retryWrites=true&w=majority",
  options: { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true },

  schemas: [
    users, // Add Mongoose Schema here
  ],
});
