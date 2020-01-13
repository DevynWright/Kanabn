<template>
  <div class="card">
    <div :style="{ 'background-image': 'url(https://us.123rf.com/450wm/yamabikay/yamabikay1802/yamabikay180200158/96042907-dark-grey-paper-background-texture-close-up-high-resolution-photo-.jpg?ver=6)' }" class="card-body">
      <h5 class="card-title">
        {{listData.title}}
        <h6 @click.prevent="deleteList(listData)" style="color: red" class="fas fa-trash-alt"></h6>
      </h5>

      <drag v-for="task in tasks" :key="task._id" :transfer-data="{task: task}">
        <task :taskData="task" />
      </drag>

      <button id="task-button" @click.prevent="showTask" class="btn btn-dark">Add Task</button>
      <modal :name="listData.id">
        <form @submit.prevent="addTask">
          <div class="form-group">
            <input
              name="title"
              type="text"
              v-model="newTask.title"
              required
              placeholder="Task Title..."
            />
          </div>
          <button class="btn btn-dark" @click="hideTask" type="submit">Add Task</button>
        </form>
      </modal>
    </div>
  </div>
</template>

<script>
import task from "../components/Task";
import Vue from "vue";
import { Drag, Drop } from "vue-drag-drop";

export default {
  name: "Lists",
  props: ["listData"],
  data() {
    return {
      newTask: {}
    };
  },
  mounted() {},

  components: {
    task,
    Drag,
    Drop
  },
  methods: {
    addTask() {
      console.log("made it to the addTask function from the modal");
      let task = { ...this.newTask };
      task.listId = this.listData.id;
      task.boardId = this.$route.params.boardId;
      this.newTask = {
        title: "",
        authorId: this.$store.state.user._id,
        listId: this.listData.id
      };
      this.$store.dispatch("addTask", task);
    },
    showTask() {
      this.$modal.show(this.listData.id);
    },
    hideTask() {
      this.$modal.hide(this.listData.id);
    },
    deleteList(listData) {
      this.$store.dispatch("deleteList", listData); //entet sweet alerts here TODO
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks.filter(t => t.listId == this.listData._id);
    }
  }
};
</script>

<style>
#card-body{
  margin-left: 50px
}
#task-button{
  margin-top: 20px
}
</style>
