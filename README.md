# 基于vue2.0+localStorage组件化开发的本地代做事项记录本

## 功能说明
- 支持编辑事件
- 支持删除事件
- 支持清空所有事件
- 支持本地化存储
- 支持每日一句的刷新显示
- 支持所选择城市的天气实况更新
- 支持城市的选择更换

## 主要难点、知识点

### 1.本地存储

知识点：localStorage是HTML5提供的一种在客户端存储数据的新方法.

用法：

	1）存储数据：localStorage.setItem(item, value)
	2）获取数据：localStorage.getItem(item)
	3）移除数据：localStorage.removeItem(item)

### 2.父子组件间的通讯
	
知识点：组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。

	1）父组件可以使用 props 把数据传给子组件。
	2）子组件可以使用 $emit 触发父组件的自定义事件。

### 3.axio请求

知识点：axio请求，以及模版字面量的使用

天气请求的api是配合个人在心知天气上申请到个人密钥进行使用，每日一句的api则是免费使用的。axio请求后，要综合考虑成功和失败两种回调，同时要注意请求回来的数据格式，避免产生不必要的错误。

### 4.animate.css动画的使用以及一些库或插件的引用

本次使用了许多的库与插件，包括：animate.css、axios、v-distpicker、nanoid、element-ui组件库

animate.css所用的动画得在组件进入和离开时，才会显示。在每日一句和天气得更新中，组件或者说标签并没有更新，所以动画并没有像我一开始得想法那样呈现。解决这个问题，可能需要对代码进行较大的更改，所以我就暂时放下了。现在只有待做事件和每日一句初次渲染拥有动画效果。
nanoid用于生成唯一id。

### 5.'element-ui'组件库的按需引用

按需引用，可以减少资源的占用。

## 总结 ##

尽管只是做了个小小的待做事项记录本，我感觉收获还是很大的，很多vue的相关知识点掌握得更加的牢固。记录本的页面逻辑比较简单，只有一个页面，所以并没有用到路由来写，这个知识点没有运用上，还是有些可惜的。
做这个记事本的初衷，是因为在学习生活中，我都会把最近要做的事情给记在本子上，完成之后就会打钩，在学习了vue之后就想尝试用vue去实现它。
未来我的前端能力更加优秀时，我会尝试将更多的功能加入其中。