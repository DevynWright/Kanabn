<template>
<div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <ul>
            <li>
              {{taskData.title}}
              <i @click.prevent="deleteTask(taskData)" style="color: red" class="fas fa-trash-alt"></i>
              <i @click.prevent="showEditTask" style="color: green" class="fas fa-edit"></i>
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
          <button>add comment</button>
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
  showEditTask() {
    this.$modal.show(this.taskData.id);
  },
  hideEditTask() {
    this.$modal.hide(this.taskData.id);
  }
}

}
</script>

<style>

</style>