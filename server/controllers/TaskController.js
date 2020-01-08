import express from "express";
import _taskService from "../services/TaskService";
import { Authorize } from "../middleware/authorize.js";

export default class TaskController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("", this.getTasks)
      .post("", this.createTask)
      .delete("/:id/list:id", this.deleteTask)
      .use(this.defaultRoute);
  }

  defaultRoute(req, res, next) {
    next({ staus: 404, message: "No Such Route Found" });
  }

  async getTasks(req, res, next) {
    try {
      let data = await _taskService.getTasks(
        req.params.boardId,
        req.session.uid
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      let data = await _taskService.getAll(req.session.uid);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async createTask(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await _taskService.createTask(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteTask(req, res, next) {
    try {
      await _taskService.deleteTask(req.params.id, res.session.uid);
      res.send("SHE GONE");
    } catch (error) {
      next(error);
    }
  }

  async;
}
