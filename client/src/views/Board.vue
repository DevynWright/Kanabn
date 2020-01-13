<template>
<div id="bg" :style="{ 'background-image': 'url(https://scottcoyneunderdev.files.wordpress.com/2015/02/dark-wood-high-quality-wallpaper-hd-resolution3.jpg)' }">
  <div class="conatiner-fluid">
    <div class="row">
      <div id="home-boards" class="col-12">
        <router-link :to="{name: 'boards'}"><img id="logo-button" src="../assets/logofixed.png" alt=""></router-link>
      </div>
      <div style="color: white" class="col-12"><h2>{{board.title}}</h2></div>
      <div style="color: white" class="col-12"><h4>{{board.description}}</h4></div>
      <div style="color: white" class="col-12">
        <button class="btn btn-dark" @click.prevent="show">add list</button>
          <modal name="addListModal">
            <form @submit.prevent="addList">
              <div class="form-group">
                <input
                  name="title"
                  type="text"
                  v-model="newList.title"
                  required
                  placeholder="List Title..."
                />
              </div>
              <button class="btn btn-dark" type="submit" @click="hide">Add List</button>
            </form>
          </modal>
      </div>
    </div>
  </div>
<div class="container-fluid">
  <div class="row">
    
    <div id="list-body" class="col-3">
      <drop
      v-for="list in lists"
      :key="list._id"
      @dragleave="over = false"
      @dragover="over = true"
      @drop="moveTask(list, ...arguments)"
      >
      <lists :listData="list" />
      </drop>
    </div>
  </div>
</div>
</div>
</template>

<script>
import lists from "@/components/List";
import Vue from "vue";
import { Drag, Drop } from "vue-drag-drop";

export default {
  name: "board",
  data() {
    return {
      newList: {
        title: "",
        authorId: this.$store.state.user._id,
        boardId: this.$route.params.boardId
      }
    };
  },
  mounted() {
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getLists", {
      boardId: this.$route.params.boardId,
      authorId: this.$store.state.user._id
    });
    this.$store.dispatch("getTasks", {
      boardId: this.$route.params.boardId,
      authorId: this.$store.state.user._id
    });
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
      return this.$store.state.lists;
    }
  },
  props: ["boardId"],
  methods: {
    addList() {
      let list = { ...this.newList };
      this.$store.dispatch("addList", list);
      this.newList = {
        title: "",
        authorId: this.$store.state.user._id,
        boardId: this.$route.params.boardId
      };
    },
    moveTask(list, task) {
      let movedTask = {
        title: task.task.title,
        authorId: task.task.authorId,
        boardId: task.task.boardId,
        listId: list._id,
        id: task.task.id,
        comments: task.task.comments
      };
      console.log("from List", list);
      console.log(task);
      console.log("final task", movedTask);

      this.$store.dispatch("moveTask", movedTask);
    },
    show() {
      this.$modal.show("addListModal");
    },
    hide() {
      this.$modal.hide("addListModal");
    }
  },
  components: {
    lists,
    Drag,
    Drop
  }
};
</script>
<style>
#logo-button{
  height: 15vh;
  float: left;
}
#list-body{
  display: flex;
  justify-content: space-between;
}
</style>