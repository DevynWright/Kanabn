import mongoose from 'mongoose'
import List from "../models/List"
import ApiError from '../utils/ApiError'

const _repository = mongoose.model('List', List)

class ListService {
    async getById(id, userId){
        let data = await _repository.find({boardId: id, authorId: userId})
        if (!data){
            throw new ApiError("Invalid ID or you do not own this baord", 400)
        }
        return data
    }
    async create (rawData){
        let data = await _repository.create(rawData)
        return data
    }
    async edit(id, userId, update){
        let data = await _repository.findOneAndUpdate({_id: id, authorId: userId}, update, {new: true})
        if (!data){
            throw new ApiError("Invalid ID or you do not own this board", 400)
        }
        return data
    }
    async delete(id, userId){
        let data = await _repository.findByIdAndDelete({_id: id, authorId: userId})
        if (!data){
            throw new ApiError("Invalid ID or you do not own this board", 400)
        }
    }

}


const _listService = new ListService()
export default _listService