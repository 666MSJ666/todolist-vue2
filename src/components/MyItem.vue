<template>
    <li>
      <label>
        <input
          type="checkbox"
          :checked="todo.done"
          @change="handleCheck(todo.id)"
        />
        <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
        <!-- <input type="checkbox" v-model="todo.done"/> -->
        <span v-show="!todo.isEdit">{{ todo.title }}</span>
        <input
          type="text"
          :value="todo.title"
          v-show="todo.isEdit"
          @blur="handleBlur(todo, $event)"
          ref="inputTitle"
        />
      </label>
      <button class="btn btn-danger" @click="handleDelete(todo.id)">
        删除
      </button>
      <button
        class="btn btn-edit"
        @click="handleEdit(todo)"
        v-show="!todo.isEdit"
      >
        编辑
      </button>
    </li>
</template>

<script>

export default {
  name: "MyItem",
  //   声明接收todo对象
  props: ["todo"],
  methods: {
    //勾选or取消勾选
    handleCheck(id) {
      // this.checkTodo(id)
      this.$bus.$emit("checkTodo", id);
    },
    // 删除
    handleDelete(id) {
      if (confirm("确认删除吗？"))
        // this.deleteTodo(id)
        this.$bus.$emit("deleteTodo", id);
    },
    handleEdit(todo) {
      // todo.isEdit = !todo.isEdit   事先写好isEdit属性
      // 当场添加一个isEdit属性
      // 先判断有没有这个属性
      if (Object.hasOwnProperty.call(todo, "isEdit")) {
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true);
      }
      // 用定时器其实也可以
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
    },
    handleBlur(todo, e) {
      todo.isEdit = false;
      if (!e.target.value.trim()) return alert("输入不能为空");
      this.$bus.$emit("updateTodo", todo.id, e.target.value);
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>