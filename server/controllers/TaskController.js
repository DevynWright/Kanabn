import express from "express";
import _taskService from "../services/TaskService";
import { Authorize } from "../middleware/authorize.js";

export default class TaskController {
  constructor() {
    this.router = express
    .Router({ mergeParams: true }) //Allows to get parameters from main
      .use(Authorize.authenticated)
      .get("", this.getTasks)
      .post("", this.createTask)
      .post("/:id", this.createComment)
      .put("/:id", this.editTask)
      .delete("/:id", this.deleteTask)
      .put("/:id/comments/:id", this.deleteComment)
      .use(this.defaultRoute);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Routeee Found" });
  }

  async getTasks(req, res, next) {
    try {
      let data = await _taskService.getTasks(
        req.query.boardId,
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
  async createComment(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await _taskService.createComment(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteTask(req, res, next) {
    try {
      await _taskService.deleteTask(req.params.id, req.session.uid);
      res.send("SHE GONE");
    } catch (error) {
      next(error);
    }
  }
  async editTask(req, res, next){
    console.log(req.body);
    
    try {
      let data = await _taskService.editTask(req.params.id, req.session.uid, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async deleteComment(req, res, next) {
    try {
    
      await _taskService.deleteComment(req.body.taskId, req.body._id);
      res.send("SHE GONE");
    } catch (error) {
      next(error);
    }
  }

  
}
