<template>
<div id="bg" :style="{ 'background-image': 'url(https://scottcoyneunderdev.files.wordpress.com/2015/02/dark-wood-high-quality-wallpaper-hd-resolution3.jpg)' }">

  <div class="boards row">
    <div class="col-12">
      <h3 style="color:white" id="logoutButton" > Hey there {{user.name}}!   <button @click.prevent="logout" class="btn btn-dark" type="submit">Logout</button></h3>
    </div>
    <div class="col-12">
      <h1 style="color:white">Welcome to your Drop Stone Boards</h1>
    </div>
    <div class="col-12">
      <form @submit.prevent="addBoard">
        <input type="text" placeholder="title" v-model="newBoard.title" required>
        <input type="text" placeholder="description" v-model="newBoard.description">
        <button type="submit">Create Board</button>
      </form>
    </div>
    <div id="chalkboard" :style="{ 'background-image': 'url(https://img.glyphs.co/img?src=aHR0cHM6Ly9zMy5tZWRpYWxvb3QuY29tL3Jlc291cmNlcy9EYXJrLUNydW1wbGVkLVBhcGVyLVRleHR1cmVzLVByZXZpZXctMS5qcGc&q=90&enlarge=true&h=1036&w=1600)' }">
     <div v-for="board in boards" :key="board._id">
        <router-link :to="{name: 'board', params: {boardId: board._id}}"><b style="color: white">{{board.title}}</b></router-link>
        <i @click.prevent="deleteBoard(board)" style="color: red" class="fas fa-trash-alt"></i>
      </div> 
    </div>
    
  </div>
</div>
</template>

<script>
  export default {
    name: "boards",
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      user(){
      return (
        this.$store.state.user
      )
    },
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      logout(){
        this.$store.dispatch("logout")
        location.reload()
      },
      deleteBoard(board){
    this.$store.dispatch("deleteBoard", board) //entet sweet alerts here TODO
  }
    }
  };
</script>
<style>
#logoutButton{
  border-radius: 8px;
  height: 6vh;
  float: right;
}
#chalkboard{
  margin: 5em;
  height: 53vh;
  width: 70vw;
  background-size: cover;
  border-radius: 5%
}
</style>