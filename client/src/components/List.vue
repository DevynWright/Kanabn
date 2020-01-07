<template>

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{listData.title}}</h5>
        <span v-for="task in tasks" :key="task._id">
          <task :taskData="task" />
          </span>
        <button @click.prevent="showTask" href="#" class="btn btn-primary">Add Task</button>
          <modal name="addTaskModal">
            <form @submit.prevent="addTask">
              <div class="form-group">
                <input name="title" type="text" v-model="newTask.title" required placeholder="Task Title..."/>
              </div>
              <button type="submit">Add List</button>
            </form>
          </modal>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import task from "../components/Task"
export default {
  name: 'Lists',
  data(){
    return {
      newTask:{
        title: "",
        authorId: this.$store.state.user._id,
        listId: this.listData._id
      }
    }
  },
  props: ["listData"],
  mounted(){
    this.$store.dispatch("getTasks", {listId: this.listData._id, authorId: this.$store.state.user._id})
  },

  components:{
    task
  },
   methods: {
    addTask(){
      console.log("made it to the addTask function from the modal")
      let task = { ...this.newTask };
      this.$store.dispatch("addTask", task);
      this.newTask = {
        title: "",
        authorId: this.$store.state.user._id,
        listId: this.listData._id //FIXME get the list id 
      }
    },
    showTask () {
      this.$modal.show('addTaskModal');
    },
    hideTask () {
      this.$modal.hide('addTaskModal');
    }
  },
  computed: {
    tasks(){
      return this.$store.state.tasks
    }
  }
}
</script>

<style scoped>
</style>
