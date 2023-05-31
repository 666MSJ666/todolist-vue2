// 该文件是整个项目的入口文件

// 引入Vue
import Vue from 'vue'
// 引入App组件，它是所有组件的父组件
import App from './App.vue'
import { Icon,Button,Divider} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 关闭vue的生产提示
Vue.config.productionTip = false
Vue.use(Icon)
Vue.use(Button)
Vue.use(Divider)



// 创建Vue实例对象--vm
new Vue({
  el:'#app',
  // App组件放入容器中
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  }
})
