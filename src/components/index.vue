<template>
    <div class="layout" id="#index">
        <Layout>
            <Header class="clearfix">
                <div class="pro-title">瀚途车管家后台</div>
                <div class="pro-user">
                    <div class="pro-user-item" style="text-align:center;">
                        <div v-if="userName" style="border-radius: 50%;height: 50px;width: 50px;">
                            <Avatar size="large" style="color: #f56a00;background-color: #fde3cf">{{userName[0]}}</Avatar>
                        </div>
                        <div v-else style="border-radius: 50%;width: 50px;height: 50px;">
                            <Icon type="ios-contact" size="48" style="border-radius: 50%; color: #fff;" />
                        </div>
                    </div>
                    <div class="pro-user-item" style="color: #fff; font-size: 20px; padding: 0 20px; text-align: center;">{{userName||"未登录"}}</div>
                    <div class="pro-user-item" style="text-align: center;">
                        <Icon type="ios-power" @click="logout" size="24" style="border-radius: 50%; color: #fff;" />
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider hide-trigger width="250">
                    <Menu theme="dark" style="width: 250px;" :open-names="['2']" :active-name="activeName">
                        <MenuItem name="1" to="/1">
                            <Icon type="ios-speedometer-outline" />
                            系统配置
                        </MenuItem>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-calendar-outline" />
                                数据结构
                            </template>
                            <MenuItem name="2-1" to="/2-1">日志集</MenuItem>
                            <MenuItem name="2-2" to="/2-2">指标集</MenuItem>
                        </Submenu>
                        <!-- <MenuItem name="3" to="/3">
                            <Icon type="ios-list-box-outline" />
                            管理员信息
                        </MenuItem> -->
                    </Menu>
                </Sider>
                <!-- <Breadcrumb :style="{margin: '24px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb> -->
                <Content class="layout-content">
                  当前位置：{{  }}
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<style lang="less">
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.pro-title {
  float: left;
  height: 64px;
  line-height: 64px;
  color: #fff;
  font-size: 25px;
}
.pro-user {
  float: right;
}
.pro-user-item {
    float: left;
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
    this.getUserInfo();
    // console.log(this.$route.path);
    this.setSelect(this.$route.path);
  },
  // watch: {
  //   $route ( to, from ) {
  //     this.setSelect(to.path);
  //   }
  // },
  methods: {
    // 设置刷新时左边slide默认选中
    setSelect (path) {
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
        this.userName = loginInfo ? loginInfo.nickName : "未登录";
    },
    //退出登录
    logout() {
        this.$Modal.confirm({
            title: '提示',
            content: '确定退出登录?',
            onOk: () => {
                docCookies.removeItem("loginInfo");
                this.$router.push(
                    {path: '/login'},
                );
            }
        });
    }
  }
};
</script>

