<template>
  <div class="todo-footer" v-show="total">
    <!-- <label>
      <input type="checkbox" 
      :checked="isAll" 
      @change="changeCheck"
      /> -->
    <label>
      <input type="checkbox" 
      v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{total}}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos"],
  computed: {
    total() {
      return this.todos.length;
    },
    doneTotal() {
      // let i = 0
      // this.todos.forEach((todo)=>{
      //     if (todo.done === true)
      //     i++
      // })
      // return i

      // reduce完整写法--用于条件统计
      // const x = this.todos.reduce((pre,current)=>{
      //   return pre + (current.done? 1:0)
      // },0)

      // 最精简版本
      return this.todos.reduce(
        (pre, current) => pre + (current.done ? 1 : 0),0);
    },
    isAll: {
      get(){
        return this.total === this.doneTotal && this.total > 0;
      },
      set(value){
        // this.checkAllTodo(value)
      this.$emit('checkAllTodo',value)
      }
      
    },
  },
  methods: {
    // changeCheck(e) {
    //   this.checkAllTodo(e.target.checked);
    // },
    clearAll(){
      if(confirm("确定删除吗？"))
      // this.clearAllTodo()
      this.$emit('clearAll')
    }
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>