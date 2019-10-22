<template>
    <Layout class="layout">
        <Sider hide-trigger width="250">
            <div class="pro-title">磐石管理</div>
            <Menu theme="dark" width="250px" :open-names="['data']" :active-name="activeName">
                <MenuItem name="system-config" to="/system-config">
                <Icon type="ios-speedometer-outline" />
                系统配置
                </MenuItem>
                <Submenu name="data">
                    <template slot="title">
                        <Icon type="ios-calendar-outline" />
                        数据结构
                    </template>
                    <MenuItem name="data-logset" to="/data-logset">日志集</MenuItem>
                    <MenuItem name="data-indexset" to="/data-indexset">指标集</MenuItem>
                </Submenu>
                <!-- <MenuItem name="3" to="/3">
                            <Icon type="ios-list-box-outline" />
                            管理员信息
                        </MenuItem> -->
            </Menu>
        </Sider>
        <Layout>
            <Header class="pro-header">
                <div class="pro-location">当前位置：{{ currentLocation }}</div>
                <div class="pro-user">
                    <div class="pro-user-item" style="text-align:center;">
                        <div v-if="userName" class="pro-user-avatar">
                            <Avatar size="large" style="color: #f56a00;background-color: #fde3cf">{{userName[0]}}</Avatar>
                        </div>
                        <div v-else>
                            <Icon type="ios-contact" size="48" style="border-radius: 50%; color: #fff;" />
                        </div>
                    </div>
                    <div class="pro-user-item" style="color: #fff; font-size: 20px; padding: 0 20px; text-align: center;">{{userName||"未登录"}}</div>
                    <div class="pro-user-item" style="text-align: center;">
                        <Icon type="ios-power" @click="logout" size="24" style="border-radius: 50%; color: #fff;" />
                    </div>
                </div>
            </Header>
            <router-view class="layout-content"></router-view>
        </Layout>
    </Layout>
</template>
<script>
import docCookies from "@/lib/cookies"

export default {
    data() {
        return {
            // 当前位置
            currentLocation: "",
            //用户信息
            userName: "",
            activeName: "1", //默认选中
        };
    },
    computed: {},
    mounted() {
        // 得到路由中的name
        var loginInfo = docCookies.getItem("loginInfo");
        if (loginInfo == "" || loginInfo == null || loginInfo == undefined) {
            this.$router.push({
                path: "/login"
            });
        }
        this.currentLocation = this.$route.name;
        this.getUserInfo();
        this.setSelect(this.$route.path);
    },
    watch: {
        $route ( to, from ) {
            console.log(to, from)
            this.currentLocation = to.name;
        }
    },
    methods: {
        // 设置刷新时左边slide默认选中
        setSelect(path) {
            var arr = path.split("/")[1].split("-");
            if (arr[1]) {
                this.activeName = arr.join("-");
            } else {
                this.activeName = arr[0];
            }
        },
        // 登陆进入页面获取用户信息
        getUserInfo() {
            var loginInfo = JSON.parse(docCookies.getItem("loginInfo"));
            this.userName = loginInfo ? loginInfo.name : "未登录";
        },
        //退出登录
        logout() {
            this.$Modal.confirm({
                title: '提示',
                content: '确定退出登录?',
                onOk: () => {
                    docCookies.removeItem("loginInfo");
                    this.$router.push({ path: '/login' }, );
                }
            });
        }
    }
};
</script>
<style lang="less">
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.pro-title {
    text-align: center;
    height: 64px;
    line-height: 64px;
    color: #fff;
    font-size: 25px;
}

.pro-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .pro-location {
        color: #fff;
        font-size: 20px;
    }
    .pro-user {
        display: flex;
        align-items: center;
        .pro-user-avatar {
            border-radius: 50%;
            height: 50px;
            width: 50px;
            display: flex;
            align-items: center;
        }
    }
}

.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}

.layout-content {
    min-height: 650px;
    overflow: hidden;
}

.m20 {
    background-color: #fff;
    margin: 20px;
}

.mb10 {
    margin-bottom: 10px;
}

.menu-icon {
    transition: all 0.3s;
}

.rotate-icon {
    transform: rotate(-90deg);
}

.menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
}

.menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
}

.collapsed-menu span {
    width: 0px;
    transition: width 0.2s ease;
}

.collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
}
</style>