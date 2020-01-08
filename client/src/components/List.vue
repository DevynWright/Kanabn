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
              <button @click="hideTask" type="submit">Add List</button>
            </form>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import task from "../components/Task";
export default {
  name: "Lists",
  data() {
    return {
      newTask: {}
    };
  },
  props: ["listData"],
  mounted() {
  },

  components: {
    task
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
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks.filter(t => t.listId == this.listData._id);
    }
  }
};
</script>

<style scoped>
</style>
