<template>
    <div id="app">
        <!-- 切换主页面和登陆页面 -->
        <router-view></router-view>
    </div>
</template>
<style lang="less">
html,
body,
#app {
    height: 100%;
}

.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
</style>
<script>
export default {
    name: "app",
    data: {

    }
}
</script>