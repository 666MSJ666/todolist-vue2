<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-left-wrap">
        <DailySentence />
      </div>
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo" />
        <MyList :todos="todos" />
        <MyFooter
          :todos="todos"
          @checkAllTodo="checkAllTodo"
          @clearAllTodo="clearAllTodo"
        />
      </div>
      <div class="todo-right-wrap">
        <TodayWeather />
      </div>
    </div>
  </div>
</template>

<script>
//引入组件
import MyFooter from "./components/MyFooter.vue";
import MyHeader from "./components/MyHeader.vue";
import MyList from "./components/MyList.vue";
import DailySentence from "./components/DailySentence.vue";
import TodayWeather from "./components/NowWeather.vue";

export default {
  name: "App",
  // 注册组件
  components: { MyHeader, MyFooter, MyList, DailySentence, TodayWeather },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    // 添加一个todo
    addTodo(todoOBJ) {
      // 函数被调用后，将传来的参数加到app里的data里，data变化，模板就重新编译了
      this.todos.unshift(todoOBJ);
    },
    // 勾选或取消勾选一个todo
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done;
      });
    },
    // 删除一个todo
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
    },
    // 全选还是不全选
    checkAllTodo(x) {
      this.todos.forEach((todo) => {
        todo.done = x;
      });
    },
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
    // 更新一个todo
    updateTodo(id, title) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.title = title;
      });
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
  mounted() {
    this.$bus.$on("checkTodo", this.checkTodo);
    this.$bus.$on("deleteTodo", this.deleteTodo);
    this.$bus.$on("updateTodo", this.updateTodo);
  },
  beforeDestroy() {
    this.$bus.$off("checkTodo", this.checkTodo);
    this.$bus.$off("deleteTodo", this.deleteTodo);
    this.$bus.$$off("updateTodo", this.updateTodo);
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}


.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: aqua;
  border: 1px solid blue;
  margin-right: 5px;
}

.btn:focus {
  outline: none;
}

.todo-container {
  /* width: 600px; */
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f7ce76;
}

.todo-left-wrap {
  width: 100px;
}

.todo-right-wrap {
  width: 100px;
}
</style>