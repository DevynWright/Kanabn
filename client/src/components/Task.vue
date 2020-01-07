<template>
  <div class="task">
      <ul>
        <li>
        {{taskData.title}}
        </li>
      </ul>
  </div>
</template>

<script>
export default {
name: "Tasks",
props: ["taskData"]

}
</script>

<style>

</style>