<template>
  <div>
    <transition
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__slideInDown"
      leave-active-class="animate__slideOutUp"
    >
      <span class="content">{{ info.sentence }}</span>
    </transition>
    <el-divider></el-divider>
    <transition
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__lightSpeedInLeft"
      leave-active-class="animate__lightSpeedOutRight"
    >
      <span class="writer">by{{ info.name }}</span>
    </transition>
    <el-divider></el-divider>
    <transition
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__lightSpeedInLeft"
      leave-active-class="animate__lightSpeedOutRight"
    >
      <span class="origin">--{{ info.origin }}</span>
    </transition>
    <el-divider></el-divider>
    <el-button
      icon="el-icon-refresh-left"
      circle
      @click="updateSentence"
    ></el-button>
  </div>
</template>

<script>
import "animate.css";
import axios from "axios";
export default {
  name: "DailySentence",
  props: ["todos"],
  data() {
    return {
      info: {
        sentence: "我们走过风走过雨，就是没能走进彼此的内心",
        name: "佚名",
        origin: "《自分》",
      },
    };
  },
  methods: {
    updateSentence() {
      //获取新的每日一句
      axios.get(`https://api.xygeng.cn/one`).then(
        (response) => {
          //   console.log("请求成功了", response);
          //请求成功后更新data的数据
          // 增加判断，滤去太长的句子
          if (response.data.data.content.length <= 28) {
            (this.info = ""),
              (this.info = {
                sentence: response.data.data.content,
                name: response.data.data.name,
                origin: response.data.data.origin,
              });
          } else {
            this.updateSentence();
          }
        },
        (error) => {
          console.log("请求失败了", error);
        }
      );
    },
  },
};
</script>

<style lang="css" scoped>
div {
  text-align: center;
  border: 1px solid #ddd;
    background-color: #FDBF68;
}
.content {
  writing-mode: vertical-lr;
  text-align: center;
  white-space: pre-wrap;
  height: 50%;
  width: 100px;
  font-family: 华文新魏;
  font-size: 30px;

}

.writer {
  height: 25%;
  width: 100px;
  font-family: 华文楷体;
  font-size: 20px;
}

.origin {
  height: 25%;
  width: 100px;
  font-family: 华文楷体;
  font-size: 20px;
}

</style>

