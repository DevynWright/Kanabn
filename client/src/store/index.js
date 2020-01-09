import Vue from "vue";
import Vuex, { Store } from "vuex";
import Axios from "axios";
import router from "../router/index";
import AuthService from "../AuthService";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    lists: [],
    tasks: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    addList(state, lists) {
      state.lists = lists;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout();
        if (!success) {
        }
        commit("resetState");
        router.push({ name: "login" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    //#endregion

    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get("boards").then(res => {
        commit("setBoards", res.data);
      });
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post("boards", boardData).then(serverBoard => {
        dispatch("getBoards");
      });
    },
    //#endregion

    //#region -- LISTS --
    async addList({ commit, dispatch }, listData) {
      let res = await api.post("lists", listData);
      //commit("addList", res.data); NOTE This is what broke stuff
      dispatch("getLists", listData);
    },
    async getLists({ commit, dispatch }, payload) {
      let res = await api.get(
        "boards/" + payload.boardId + "/lists");

      commit("addList", res.data);
    },

    //#endregion

    //#region -- TASKS --

    async addTask({ commit, dispatch }, taskData) {
      let res = await api.post("tasks", taskData);
      commit("addTask", res.data); 
      //dispatch("getTasks", taskData);
    },
    async addComment({ commit, dispatch }, comment) {
      console.log("actual comment before sending up", comment);
      let res = await api.post("tasks/" + comment.taskId, comment);
      console.log("comment res", res.data );
      
      dispatch("getTasks", comment);
    },
    async getTasks({ commit, dispatch }, payload) {
      let res = await api.get("tasks?boardId=" + payload.boardId);
      commit("setTasks", res.data);
    },
    async deleteTask({commit, dispatch}, taskData){
      await api.delete("tasks/" + taskData._id)
      dispatch("getTasks", taskData)
    },
    async editTask({commit, dispatch}, editedTask){
      let res = await api.put("tasks/" + editedTask.taskId, editedTask);
      dispatch("getTasks", editedTask); //NOTE Needs to be res.data eventually 
    },
    async deleteList({commit, dispatch}, listData){
      await api.delete("lists/" + listData._id)
      dispatch("getLists", listData)
    },
    async deleteBoard({commit, dispatch}, board){
      await api.delete("boards/" + board._id)
      dispatch("getBoards", board)
    },
    async deleteComment({commit, dispatch}, comment){
      console.log(comment);
      
      await api.put("tasks/" + comment.taskId + "/comments/" + comment._id, comment)
      dispatch("getTasks", comment)
  }
}
});
//#endregion
