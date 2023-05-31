<template>
  <div class="todo-header"
  style="">
    <h2>代办事项</h2>
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter="add" />
  </div>
</template>

<script>
// 引入一个随机生成唯一id的库
import {nanoid} from 'nanoid'
export default {
  name: "MyHeader",
  methods:{
    // 将用户的输入包装成一个todo对象
    add(e){
        if(e.target.value){
        const todoOBJ = {id:nanoid(),title:e.target.value,done:false}
        this.$emit('addTodo',todoOBJ)//在这里调用了App里的函数，app的函数就可以收到这里传过去的参数todoOBJ
        }
        else{
            return alert("输入不能为空！")
        }
        // 清空输入框，这样直接操作dom，在vue的风格指南里时不推荐的   
        e.target.value=''
    }
  }
};
</script>

<style scoped>
/*header*/
h2{
  text-align: center;
}

.todo-header{
  background-color:#E59B46;

} 

.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  padding: 4px 7px;
  }

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>