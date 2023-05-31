<template>
  <ul class="todo-main">
    <h3 v-show="!todos.length">做点什么吧！</h3>
    <transition-group
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__backInLeft"
      leave-active-class="animate__backOutRight"
    >
      <MyItem v-for="todoOBJ in todos" :key="todoOBJ.id" :todo="todoOBJ" />
      <!-- 使用了:，todo后面的才是表达式 -->
    </transition-group>
  </ul>
</template>

<script>
import MyItem from "./MyItem.vue";
import "animate.css";
export default {
  name: "MyList",
  components: { MyItem },
  props: ["todos"],
};
</script>

<style scoped>
/*main*/
h3{
  text-align: center;
}
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>