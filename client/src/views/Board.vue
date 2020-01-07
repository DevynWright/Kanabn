<template>
<div>
  <router-link :to="{name: 'boards'}">Home</router-link>
  <div class="board">{{board.title}}</div>
  <div>{{board.description}}</div>
  <button @click.prevent="show" >add list</button>
  <modal name="addListModal">
    <form @submit.prevent="addList">
      <div class="form-group">
        <input name="title" type="text" v-model="newList.title" required placeholder="List Title..."/>
      </div>
        <button type="submit" @click="hide">Add List</button>
    </form>
  </modal>
</div>
</template>

<script>
export default {
  name: "board",
  data(){
    return {
      newList:{
        title: "",
        authorId: this.$store.state.user._id,
        boardId: this.$route.params.boardId
      }
    }
  },
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
  props: ["boardId"],
  methods: {
    addList(){
      let list = { ...this.newList };
      this.$store.dispatch("addList", list);
      this.newList = {
        title: "",
        authorId: this.$store.state.user._id,
        boardId: this.$route.params.boardId
      }
    },
    show () {
      this.$modal.show('addListModal');
    },
    hide () {
      this.$modal.hide('addListModal');
    }
  },
};
</script>
