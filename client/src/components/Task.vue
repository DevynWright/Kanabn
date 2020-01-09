<template>
<div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <ul>
            <li><b>
              {{taskData.title}}</b>
              <i @click.prevent="deleteTask(taskData)" style="color: red" class="fas fa-trash-alt"></i>
              <i @click.prevent="showEditTask" style="color: green" class="fas fa-edit"></i>
            <ol>
              <li v-for="comment in taskData.comments" :key="comment._id">{{comment.name}}</li>
            </ol>
            </li>
          </ul>
          <modal :name="taskData.id">
            <form @submit.prevent="editTask">
              <div class="form-group">
                <input
                  name="title"
                  type="text"
                  v-model="editedTask.title"
                  required
                  placeholder="Task Title..."
                 />
              </div>
              <button @click="hideEditTask" type="submit">Add List</button>
            </form>
          </modal>
          <button @click="showAddComment">add comment</button>
          <modal :name="'com' + taskData.id">
            <form @submit.prevent="addComment">
              <div class="form-group">
                <input
                  name="commentTitle"
                  type="text"
                  v-model="comment.name"
                  required
                  placeholder="Comment..."
                 />
              </div>
              <button @click="hideAddComment" type="submit">Add List</button>
            </form>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tasks",
props: ["taskData"],
data(){
  return {
    editedTask: {
      title: "",
     authorId: this.taskData.authorId,
      boardId: this.taskData.boardId,
      taskId: this.taskData.id
   },
   comment: {
     name: "",
     listId: this.taskData.listId,
     taskId: this.taskData.id,
     boardId: this.taskData.boardId
   }
   }
},
methods:{
  deleteTask(taskData){
    this.$store.dispatch("deleteTask", taskData) //entet sweet alerts here TODO
  },
  editTask(){
    
    let editedTask = { ...this.editedTask }
    this.editedTask = {
      title: this.title,
      authorId: this.taskData.authorId,
      listId: this.taskData.listId,
      taskId: this.taskData.id
    }
    this.$store.dispatch("editTask", editedTask)
  },
  addComment(){
    
    let comment = { ...this.comment }
    this.comment = {
      name: this.commentTitle,
      taskId: this.taskData.id,
      authorId: this.taskData.authorId
    }
    this.$store.dispatch("addComment", comment)
  },
  showEditTask() {
    this.$modal.show(this.taskData.id);
  },
  hideEditTask() {
    this.$modal.hide(this.taskData.id);
  },
  showAddComment() {
    console.log("the comment modal ", "com" + this.taskData.id);
    
    this.$modal.show("com" + this.taskData.id);
  },
  hideAddComment() {
    this.$modal.hide("com" + this.taskData.id);
  }
}

}
</script>

<style>

</style>