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
    <div id="chalkboard" :style="{ 'background-image': 'url(https://aedcweb.com/wp-content/uploads/2018/02/cork-board-background.png)' }" class="col-4">
     <div v-for="board in boards" :key="board._id">
        <router-link :to="{name: 'board', params: {boardId: board._id}}"><b id="display-title">{{board.title}}</b></router-link>
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
  border-radius: 10%
}
</style>