<template>
<div class="conatiner-fluid">
  <div class="row">
    <div class="col-12">
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
  </div>
  <div v-for="list in lists" :key="list._id" class="row">
    <lists :listData="list"/>
  </div>
</div>
</template>

<script>
import lists from "@/components/List";
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
  mounted() {
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getLists", {boardId: this.boardId, authorId: this.$store.state.user._id});
  },
  computed: {
    board() {
      return (
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    },
    lists() {
      return this.$store.state.lists
    },
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
  components: {
    lists
  }
};
</script>
