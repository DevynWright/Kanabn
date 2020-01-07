<template>

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{listData.title}}</h5>
        <span class="card-text"><task /></span>
        <button @click.prevent="addTask" href="#" class="btn btn-primary">Add Task</button>
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
        boardId: this.$route.params.boardId
      }
    }
  },
  props: ["listData"],

  components:{
    task
  },
   methods: {
    addTask(){
      let task = { ...this.newList };
      this.$store.dispatch("addList", list);
      this.newList = {
        title: "",
        authorId: this.$store.state.user._id,
        boardId: this.$route.params.boardId
      }
      location.reload()
    },
    show () {
      this.$modal.show('addListModal');
    },
    hide () {
      this.$modal.hide('addListModal');
    }
  },
}
</script>

<style scoped>
</style>
