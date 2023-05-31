<template>
  <div class="right">
    <span>{{ info.city }}</span>
    <br />
    天气-{{ info.weather }}
    <i class="el-icon-sunny" v-if="info.weather == '晴'"></i>
    <i class="el-icon-cloudy" v-if="info.weather == '多云'"></i>
    <i class="el-icon-cloudy-and-sunny" v-if="info.weather == '阴'"></i>
    <i class="el-icon-light-rain" v-if="info.weather == '小雨'"></i>
    <i class="el-icon-light-rain" v-if="info.weather == '中雨'"></i>
    <i class="el-icon-heavy-rain" v-if="info.weather == '大雨'"></i>
    <br />
    {{ info.temperature }}℃
    <br />
    <el-divider></el-divider>
    <span>资料更新于:</span>
    <br />
    <span>{{ info.updatetime | dateFormat("MM月dd日hh时ss秒") }}</span>
    <br />
    <el-button
      size="small"
      round
      @click="updateActive"
      v-show="!boxactive && info.city.length"
    >
      更改城市
    </el-button>
    <v-distpicker
      hide-area
      v-show="boxactive"
      @city="getCity"
      class="select"
    ></v-distpicker>
    <!-- 隐藏区、市的选项 -->

    <el-button
      size="small"
      round
      @click="updateActive"
      v-show="!info.city.length"
    >
      选择所在城市
    </el-button>
  </div>
</template>

<script>
// 引入一个地区选择组件
import VDistpicker from "v-distpicker";

import axios from "axios";
export default {
  name: "NowWeather",
  components: { VDistpicker },
  data() {
    return {
      boxactive: false,
      info: {
        updatetime: "",
        // city: "珠海市",
        city: "",
        weather: "",
        temperature: "",
      },
    };
  },
  // 构造一个用于过滤请求得来的时间戳的过滤器
  filters: {
    dateFormat(date, format) {
      if (typeof date === "string") {
        var mts = date.match(/(\/Date\((\d+)\)\/)/);
        if (mts && mts.length >= 3) {
          date = parseInt(mts[2]);
        }
      }
      date = new Date(date);
      if (!date || date.toUTCString() == "Invalid Date") {
        return "";
      }
      var map = {
        M: date.getMonth() + 1, //月份
        d: date.getDate(), //日
        h: date.getHours(), //小时
        m: date.getMinutes(), //分
        s: date.getSeconds(), //秒
        q: Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds(), //毫秒
      };

      format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
        var v = map[t];
        if (v !== undefined) {
          if (all.length > 1) {
            v = "0" + v;
            v = v.substr(v.length - 2);
          }
          return v;
        } else if (t === "y") {
          return (date.getFullYear() + "").substr(4 - all.length);
        }
        return all;
      });
      return format;
    },
  },

  methods: {
    updateWeather() {
      // 上来先从localstorage中找，没有就是空
      this.info.city = localStorage.getItem("city") || "";
      // console.log(JSON.parse(localStorage.getItem("city")))
      //获取新的今日天气
      axios
        .get(
          `https://api.seniverse.com/v3/weather/now.json?key=S6c_M6KewgzO9zgD8&location=${this.info.city}&language=zh-Hans&unit=c&start=-1&days=5`
        )
        .then(
          (response) => {
            //请求成功后更新data的数据
            // 使用中间变量获取所要的对象
            let tem1 = response.data.results;
            let tem2 = tem1[0];

            this.info = {
              city: tem2.location.name,
              updatetime: tem2.last_update,
              weather: tem2.now.text,
              temperature: tem2.now.temperature,
            };
          },
          (error) => {
            console.log("天气更新失败了", error);
          }
        );
    },
    updateActive() {
      this.boxactive = !this.boxactive;
    },
    getCity(c) {
      console.log(c.value);
      localStorage.setItem("city", c.value);
      this.updateActive();
      this.updateWeather(); //城市名变化后，再次调用函数更新天气
    },
  },

  mounted() {
    this.updateWeather(); //一挂载就生成最新的天气
  },
};
</script>

<style scoped>
.right {
  border: 1px solid #ddd;
  height: 30%;
  width: 200px;
  margin: 0%;
  border-radius: 20%;
  text-align: center;
  position: fixed;
  background-color: #fdbf68;
}
</style>