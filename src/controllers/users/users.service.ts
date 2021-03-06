import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

@Injectable()
export class UsersServices {
  @Models("users") model: any;
  constructor() {}

  async create(body: any) {
    try {
      const { password, ...data } = body;
      const pw = this.setPassword(password);
      const user = await this.model.create({ password: pw, ...data });
      return { status: "success", message: "Successfuly created user", data: [user] };
    } catch (error) {
      return { status: "error", message: error.errmsg ? error.errmsg : error.toString(), data: [] };
    }
  }

  async login(body: any) {
    try {
      const { username, password } = body;
      const user = await this.model.findOne({ username });
      if (!user) {
        throw { errmsg: "Invalid username or password" };
      }
      if (!this.comparePassword(password, user.password)) {
        throw { errmsg: "Incorrect password" };
      }
      const result = user.toJSON();
      delete result.password;
      const token = jwt.sign(result, "test", { expiresIn: "1h" });
      return { status: "success", message: "Successfuly logged in", data: [result], meta: { token: token } };
    } catch (error) {
      return { status: "error", message: error.errmsg ? error.errmsg : error.toString(), data: [] };
    }
  }

  // Update user by id
  async update(id: string, body: any) {
    try {
      const user = await this.model.findByIdAndUpdate(id, body, { new: true });
      if (!user) {
        throw { errmsg: "User not found" };
      }
      return { status: "success", message: "Successfuly updated user", data: [user] };
    } catch (error) {
      return { status: "error", message: error.errmsg ? error.errmsg : error.toString(), data: [] };
    }
  }

  // Delete user by id
  async delete(id: string) {
    try {
      const user = await this.model.findByIdAndDelete(id);
      if (!user) {
        throw { errmsg: "User not found" };
      }
      return { status: "success", message: "Successfuly deleted user", data: [] };
    } catch (error) {
      return { status: "error", message: error.errmsg ? error.errmsg : error.toString(), data: [] };
    }
  }

  // Get user by id
  async getById(id: string) {
    try {
      const user = await this.model.findById(id);
      if (!user) {
        throw { errmsg: "User not found" };
      }
      return { status: "success", message: "Successfuly get user", data: [user] };
    } catch (error) {
      return { status: "error", message: error.errmsg ? error.errmsg : error.toString(), data: [] };
    }
  }

  // Get all users
  async getAll() {
    try {
      const user = await this.model.find();
      return { status: "success", message: "Successfuly get all users", data: user };
    } catch (error) {
      return { status: "error", message: error.toString(), data: [] };
    }
  }

  private setPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  private comparePassword(password: string, dbPassword: string): boolean {
    return bcrypt.compareSync(password, dbPassword);
  }
}
