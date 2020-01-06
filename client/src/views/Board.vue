<template>
<div>
  <router-link :to="{name: 'boards'}">Home</router-link>
  <div class="board">{{board.title}}</div>
  <div>{{board.description}}</div>

</div>
</template>

<script>
export default {
  name: "board",
  computed: {
    board() {
      return (
        //FIXME This does not work on page reload because the boards array is empty in the store
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    }
  },
  props: ["boardId"]
};
</script>
