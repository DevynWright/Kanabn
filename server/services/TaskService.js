import mongoose from "mongoose";
import Task from "../models/Task";
import Comment from "../models/Task"
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Task", Task);
const _comments = mongoose.model("Task.comments", Comment)

class TaskService {
  async getTasks(id, userId) {
    let data = await _repository.find({ boardId: id, authorId: userId });
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
  async createComment(rawData) {
    let data = await _repository.findOneAndUpdate({_id:rawData.taskId},{$push:{comments: rawData}}, {new: true});
    return data;
  }
  async deleteTask(id, userID) {
    let data = await _repository.findByIdAndDelete({ _id: id, authorId: userID },
      );
    if (!data) {
      throw new ApiError("Invalid id or you dont own it");
    }
  }
  async editTask(id, userID, update){
    let data = await _repository.findByIdAndUpdate({ _id: id, authorId: userID },{title: update.title, comments: update.comments, listId: update.listId},
      { new: true })
    if (!data) {
      throw new ApiError("Invalid id or you dont own")
    }
  }
  async deleteComment(id, _id) {
    console.log("taskId", id);
    console.log("commentId",_id);
    
    let data = await _repository.update({_id: id},{$pull:{comments:{_id: _id}}}, {new: true});
    return data;
  }
}

const _taskService = new TaskService();
export default _taskService;
