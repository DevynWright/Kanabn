<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div :style="{ 'background-image': 'url(https://previews.123rf.com/images/yamabikay/yamabikay1708/yamabikay170800397/84636276-gray-recycled-paper-texture-with-copy-space-high-resolution-photo-.jpg)' }" class="card-body">
          <ul>
            <li>
              <h5>{{taskData.title}}</h5>
              <i @click.prevent="deleteTask(taskData)" style="color: red" class="fas fa-trash-alt"></i>
              <i @click.prevent="showEditTask" style="color: green" class="fas fa-edit"></i>
              <ol>
                <li v-for="comment in taskData.comments" :key="comment._id">
                  <b>{{comment.name}}</b>
                  <i
                    @click.prevent="deleteComment(comment)"
                    style="color: red"
                    class="fas fa-trash-alt"
                  ></i>
                </li>
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
          <button class="btn btn-dark" @click="showAddComment">Comment</button>
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
              <button class="btn btn-dark" @click="hideAddComment" type="submit">Comment</button>
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
  data() {
    return {
      editedTask: {
        title: "",
        authorId: this.taskData.authorId,
        listId: this.taskData.listId,
        boardId: this.taskData.boardId,
        taskId: this.taskData.id,
        comments: this.taskData.comments
      },
      comment: {
        listId: this.taskData.listId,
        taskId: this.taskData.id,
        boardId: this.taskData.boardId
      }
    };
  },
  components: {},
  methods: {
    deleteTask(taskData) {
      console.log("taskData", taskData);
      this.$store.dispatch("deleteTask", taskData); //entet sweet alerts here TODO
    },
    deleteComment(comment) {
      console.log("this is what we want", comment);
      this.$store.dispatch("deleteComment", comment); //entet sweet alerts here TODO
    },
    editTask() {
      let editedTask = { ...this.editedTask };
      console.log(this.taskData.comments);

      this.editedTask = {
        title: this.title,
        authorId: this.taskData.authorId,
        boardId: this.taskData.boardId,
        listId: this.taskData.listId,
        taskId: this.taskData.id,
        comments: this.taskData.comments
      };
      this.$store.dispatch("editTask", editedTask);
      console.log("this is the new edited version", editedTask);
    },
    addComment() {
      let comment = { ...this.comment };
      (comment.taskId = this.taskData.id),
        (comment.authorId = this.taskData.authorId),
        (comment.boardId = this.taskData.boardId);
      this.comment = {
        name: this.commentTitle
      };
      this.$store.dispatch("addComment", comment);
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
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    }
  }
};
</script>

<style>
</style>