import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { UsersServices } from "./users.service";

@Controller({
  model: "./users.model",
  route: "/users",
})
export class UsersController {
  constructor(private services: UsersServices) {}

  @Post({ path: "/", middlewares: [] })
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.services.create(req.body);
    res.json(result);
  }

  @Post({ path: "/login", middlewares: [] })
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.services.login(req.body);
    res.json(result);
  }

  // Update user by id
  @Patch({ path: "/:id", middlewares: [] })
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.services.update(req.params.id, req.body);
    res.json(result);
  }

  // Delete user by id
  @Delete({ path: "/:id", middlewares: [] })
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.services.delete(req.params.id);
    res.json(result);
  }

  // Get all user
  @Get({ path: "/", middlewares: [] })
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.services.getAll();
    res.json(result);
  }

  // Get user by id
  @Get({ path: "/:id", middlewares: [] })
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.services.getById(req.params.id);
    res.json(result);
  }
}
