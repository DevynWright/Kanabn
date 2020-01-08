<template>
<div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <ul>
            <li>
              {{taskData.title}}
              <i @click.prevent="deleteTask(taskData)" style="color: red" class="fas fa-trash-alt"></i>
            </li>
          </ul>
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
methods:{
  deleteTask(taskData){
    this.$store.dispatch("deleteTask", taskData)
  }
}

}
</script>

<style>

</style>