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
  props: ["listData"],

  components:{
    task
  }
}
</script>

<style scoped>
</style>
