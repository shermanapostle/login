import { MongoSchema, MongoModel } from "@mayajs/mongo";

const schema = MongoSchema({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
    unique: true,
  },
});

export default MongoModel("Users", schema);
