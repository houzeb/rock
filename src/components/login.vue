
<template>
    <div id="login" :style="{'backgroundImage': `url(${rootPath}static/img/login/login-bg.jpg)`}">
        <div class="login-box">
            <div class="login-box-cont">
                <div class="login-box-title">后台管理登录</div>
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="0">
                    <FormItem label="" prop="account">
                        <Input class="ipt-btn" placeholder="请输入账号" type="text" :maxlength="11" v-model="formCustom.account">
                        <img :src="`${rootPath}static/img/login/account.png`" slot="prefix" alt="这是张图片">
                        </Input>
                    </FormItem>
                    <FormItem label="" prop="password">
                        <Input class="ipt-btn" placeholder="请输入密码" type="password" v-model="formCustom.password">
                        <img :src="`${rootPath}static/img/login/password.png`" slot="prefix" alt="这是张图片" />
                        </Input>
                    </FormItem>
                </Form>
                <div class="login-box-button">
                    <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import docCookies from "@/lib/cookies";
import RequestLogin from '@/api/module/login';

export default {
    name: "login",
    data() {
        const validateAccount = (rule, value, callback) => {
            var v = value.trim(),
                reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|16[6]|17[1-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            if (v == "") {
                return callback(new Error("请输入账号"));
            } else if (!reg.test(v)) {
                return callback(new Error("请输入正确的账号"));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            var v = value.trim();
            if (value == "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        };
        return {
            rootPath: process.env.BASE_URL,
            formCustom: {
                account: "",
                password: ""
            },
            ruleCustom: {
                account: [{
                    validator: validateAccount,
                    required: true,
                    max: 11,
                    trigger: "blur"
                }],
                password: [
                    { validator: validatePassword, required: true, trigger: "blur" }
                ]
            }
        };
    },
    created: function() {
        // 主页添加键盘事件,注意,不能直接在焦点事件上添加回车
        var that = this;
        document.onkeydown = function(e) {
            var key = window.event.keyCode;
            if (key == 13) {
                that.handleSubmit('formCustom');
            }
        };
    },
    mounted() {
        // 取消登录页面浏览器默认后退功能
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", function() {
            history.pushState(null, null, document.URL);
        });
        var loginInfo = docCookies.getItem("loginInfo");
        if (loginInfo != "" && loginInfo != null && loginInfo != undefined) {
            this.$router.push({
                path: "/index"
            });
        }
    },
    methods: {
        // 登陆按钮
        handleSubmit(name) {
            let that = this;
            this.$refs[name].validate(valid => {
                if (valid) {
                    that.login(name);
                }
            });
        },
        async login (name) {
            let params = {
                ...this.formCustom
            }
            let res = await RequestLogin.Login(params);
            console.log(res)
            let data = res.data;
            if (data.resultCode == "0") {
                docCookies.setItem("loginInfo", JSON.stringify(data.data));
                this.$router.push({
                    path: "/index"
                });
                this.handleReset(name);
            } else {
                this.$Message.error(data.result);
            }
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
};
</script>

<style lang="less">
#login {
    .login-box-cont {
        .ivu-form-item {
            padding-bottom: 10px;

            .ivu-form-item-content {
                text-align: center;

                .ivu-input {
                    width: 460px;
                    margin: 0 auto;
                    height: 80px;
                    border: 1px solid rgba(4, 158, 237, 1);
                    border-radius: 10px;
                    padding: 0 0 0 80px;
                    font-size: 24px;
                    color: #999999;
                }

                .ivu-input-prefix {
                    left: 65px;

                    img {
                        margin-top: 20px;
                    }
                }

                .ivu-form-item-error-tip {
                    font-size: 20px;
                    left: 40px;
                }
            }
        }

        .ivu-form-item:nth-child(1) {
            .ivu-input-prefix {
                img {
                    width: 32px;
                    height: 32px;
                }
            }
        }

        .ivu-form-item:nth-child(2) {
            .ivu-input-prefix {
                img {
                    width: 26px;
                    height: 30px;
                }
            }
        }

        .ivu-btn {
            width: 100%;
            height: 80px;
            border-radius: 10px;
            font-size: 30px;
        }
    }
}
</style>

<style lang="less" scoped>
#login {
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;

    .login-box {
        position: relative;

        .login-box-cont {
            transform: scale(0.7);
            border-radius: 20px;
            box-shadow: 0px 13px 30px 0px rgba(0, 0, 0, 0.15);
            position: absolute;
            top: 160px;
            right: 300px;
            width: 540px;
            background-color: #fff;

            .login-box-title {
                color: #059fed;
                font-size: 60px;
                font-weight: 650;
                margin: 40px auto;
                text-align: center;
            }

            .login-box-button {
                width: 460px;
                margin: 40px auto 110px;
            }
        }
    }
}
</style>