import mongoose from "mongoose";
import Task from "../models/Task";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Task", Task);

class TaskService {
  async getTasks(id, userId) {
    let data = await _repository.find({ listId: id, authorId: userId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board, 400");
    }
    return data;
  }
  async getAll(userId) {
    let data = await _repository.find({ authorId: userId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board, 400");
    }
    return data;
  }
  async createTask(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }
  async deleteTask(id, userID) {
    let data = await _repository.delete({ _id: id, authorId: userID });
    if (!data) {
      throw new ApiError("Invalid id or you dont own it");
    }
  }
}

const _taskService = new TaskService();
export default _taskService;
