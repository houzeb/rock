<!--
    管理员信息页面
    马可
    2018-9-20
-->

<template>
    <div id="administratorInformation" class="m20">
        <!-- 搜索部分 -->
        <div class="search-block">
            <Row>
                <Col span="18">
                    <Row class="search-row"> 
                        <Col span="12">
                            <span class="search-name">登录账号:</span>
                            <Input v-model="searchConfig.account" style="width: 265px;" placeholder="请输入"></Input>
                        </Col>
                        <Col span="12">
                            <span class="search-name">姓名:</span>
                            <Input v-model="searchConfig.nickName" style="width: 265px;" placeholder="请输入"></Input>
                        </Col>
                    </Row>
                </Col>
                <Col span="6">
                    <Button type="primary" @click="querySearch" class="mb10">查询</Button>
                    <Button @click="resetSearch" style="margin-left: 10px; margin-right: 10px;" class="mb10">重置</Button>
                    <Button type="primary" @click="addTable" class="mb10">新增</Button>
                </Col>
            </Row>
        </div>
        <!-- table表格展示 -->
        <div class="table1 clearfix">
            <Table height=500 :columns="tableColumns" :data="tableData"></Table>
            <div class="page">
                <Page 
                    :total="pageConfig.total" 
                    :current="pageConfig.currentPage"
                    :page-size="pageConfig.pageSize"
                    :page-size-opts="getPageSizePots"
                    show-total
                    show-elevator
                    show-sizer
                    @on-change="changePage"
                    @on-page-size-change="changeSize"
                ></Page>
            </div>
        </div>
        <!-- 弹出框 -->
        <Modal
            v-model="isShow"
            :title="modalTitle+'管理员'"
            @on-visible-change="modelClose">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                <FormItem label="登录账号:" prop="account">
                  <Input type="text" v-model="formCustom.account" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="姓名:" prop="nickName">
                    <Input type="text" v-model="formCustom.nickName" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="密码:" prop="password">
                    <Input type="text" v-model="formCustom.password" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="备注:" prop="remark">
                    <Input type="textarea" :rows="4" v-model="formCustom.remark" placeholder="请输入"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
              <Button type="text" size="large" @click="handleReset('formCustom')">取消</Button>
              <Button type="primary" size="large" @click="handleSubmit('formCustom')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<style lang="less" scoped>
#administratorInformation {
  padding: 55px 30px 0;
  .bgwhite {
    background-color: #fff;
  }
  .search-block {
    .search-row {
      margin-bottom: 15px;
      .search-name {
        display: inline-block;
        font-size: 14px;
        text-align: right;
        margin-right: 10px;
        width: 100px;
      }
    }
  }
  .table1 {
    margin-top: 60px;
    .page {
      margin: 30px 0 30px;
      float: right;
    }
  }
}
</style>

<script>
import docCookies from "@/lib/cookies.js";
export default {
  name: "administratorInformation",
  components: {},
  data() {
    const validateAccount = (rule, value, callback) => {
      var v = value.trim(),
          reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|16[6]|17[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (v == "") {
        callback(new Error("请输入登录账号"));
      } else if (!reg.test(v)) {
        return callback(new Error("登陆账号应为手机号码"))
      } else {
        callback();
      }
    };
    const validateNickName = (rule, value, callback) => {
      var v = value.trim();
      if (v == "") {
        callback(new Error("请输入姓名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      var v = value.trim(), reg = /^$/;
      if (v=="") {
        return callback(new Error("请输入密码"));
      } 
    //   else if (!reg.test(v)) {
    //     return callback(new Error("请输入正确的手机号码"))
    //   } 
      else {
        callback();
      }     
    };
    const validateRemark = (rule, value, callback) => {
      callback();
    };
    return {
      // 搜索框配置
      searchConfig: {
        account: "", // 账号
        nickName: "", // 姓名
      },
      //分页配置
      pageConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizeOpts: [1, 2, 3, 4]
      },
      // table列和头设置
      tableColumns: [
        {
          title: "编号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "姓名",
          key: "nickName",
          align: "center"
        },
        {
          title: "登录账号",
          key: "account",
          align: "center"
        },
        {
          title: "备注",
          key: "remark",
          align: "center"
        },
        {
          title: "注册时间",
          key: "createDate",
          align: "center"
        },
        {
          title: "操作",
          key: "operate",
          // width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "text",
              //       size: "small"
              //     },
              //     style: {
              //       color: "#1890FF"
              //     },
              //     on: {
              //       click: () => {
              //         this.editItem(params.row);
              //       }
              //     }
              //   },
              //   "编辑"
              // ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    // marginRight: '5px'
                    color: "#1890FF"
                  },
                  on: {
                    click: () => {
                      this.removeItem(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      // table数据
      tableData: [],
      //  搜索框中新增按钮出来弹框配置
      formCustom: {
        account: "",
        nickName: "",
        password: "111111",
        remark: "",
      },
      ruleCustom: {
        account: [{ validator: validateAccount, required: true, trigger: "blur" }],
        nickName: [{ validator: validateNickName, required: true, max: 10, trigger: "blur" }],
        password: [{ validator: validatePassword, required: true, max: 20, trigger: "blur" }],
        remark: [{ validator: validateRemark, trigger: "blur" }]
      },
      isShow: false, // 控制弹框是否显示
      modalTitle: "新增",
    };
  },
  computed: {
    getPageSizePots: function () {
      return this.pageConfig.pageSizeOpts.map(value => {
        return value * 10;
      });
    }
  },
  mounted() {
    var loginInfo = docCookies.getItem("loginInfo");
    if (loginInfo == "" || loginInfo == null || loginInfo == undefined) {
      this.$router.push({
        path: "/login"
      });
    }
    this.getTableData();
  },
  methods: {
    // 得到表格数据
    getTableData() {
      var that = this;
      this.$axios
        .post("main/selectUser", {
          ...this.searchConfig,
          currentPage: that.pageConfig.currentPage,
          pageSize: that.pageConfig.pageSize
        })
        .then(res => {
          var data = res.data;
          if (data.resultCode == "0") {
            that.tableData = data.dataList;
            that.total = data.data.pageBean.recordCount;
          } else {
            
          }
        });
    },
    // 分页改变页码
    changePage(val) {
      this.pageConfig.currentPage = val;
      this.getTableData();
    },
    // 分页改变每页个数
    changeSize(val) {
      this.pageConfig.pageSize = val;
      this.getTableData();
    },
    // 搜索框查询按钮
    querySearch() {
      this.pageConfig.currentPage = 1;
      this.pageConfig.pageSize = 10;
      this.getTableData();
    },
    // 搜索框重置按钮
    resetSearch() {
      this.searchConfig = {
        account: "",
        nickName: "",
      };
      this.querySearch();
    },
    // 搜索框新增按钮
    addTable() {
        this.isShow = true;
        this.modalTitle="新增";
        this.formCustom = {
            account: "",
            nickName: "",
            password: "111111",
            remark: "",
        }
    },
    // 表格编辑按钮
    editItem(obj) {
      this.isShow = true;
      this.modalTitle="编辑";
      this.formCustom = {
        account: obj.account||"",
        nickName: obj.nickName||"",
        password: obj.password||"",
        remark: obj.remark||"",
      }
    },
    // 表格删除按钮
    removeItem(obj) {
      var that = this;
      this.$Modal.confirm({
        title: "提示",
        content: "确定删除该条数据?",
        onOk: () => {
          this.$axios
            .get("main/deleteUser", {
              params: {
                  userID: obj.userID
              }
            })
            .then(res => {
              var data = res.data;
              if (data.resultCode == "0") {
                that.querySearch();
                that.$Message.success("删除成功");
              }
            });
        }
      });
    },
    // 弹出框内部确定按钮
    handleSubmit(name) {
      var that = this;
      var data = Object.assign({}, this.formCustom);
      for (var i in data) {
          data[i] = data[i].trim();
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          that.$axios.post('main/addUser',{
            ...data
          }).then(res => {
              var data = res.data;
            if (data.resultCode == "0") {
              that.isShow = false;
              that.$Message.success("添加成功");
              that.querySearch();
            } else {
              that.$Message.error(data.result);
            }
          });
        } else {
        }
      });
    },
    // 弹出框内部取消按钮
    handleReset(name) {
      this.isShow = false;
    },
    modelClose(flag) {
      if (!flag) {
        this.$refs['formCustom'].resetFields();
      } 
    }
  }
};
</script>
