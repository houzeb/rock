<template>
    <div class="systemConfig">
        <div class="box">
            <Row :gutter="12" class="ivu-form">
                <Col span="8" class="ivu-form-item">
                <label class="ivu-form-item-label" style="width: 80px;">姓名:</label>
                <div class="ivu-form-item-content" style="margin-left: 80px;">
                    <Input v-model="searchConfig.name" placeholder="请输入"></Input>
                </div>
                </Col>
                <!-- <Col span="8" class="ivu-form-item">
	                <label class="ivu-form-item-label" style="width: 80px;">移动电话:</label>
	                <div class="ivu-form-item-content" style="margin-left: 80px;">
	                	<Input v-model="searchConfig.mobile" placeholder="请输入"></Input>
	                </div>
	            </Col> -->
            </Row>
            <Row style="text-align: right;">
                <Col span="24">
                <Button type="primary" @click="querySearch" class="mr10 mb10">查询</Button>
                <Button @click="resetSearch" class="mr10 mb10">重置</Button>
                <Button type="primary" @click="addTable" class="mr10 mb10">新增</Button>
                <Button type="error" ghost @click="delTable" class="mb10">删除</Button>
                </Col>
            </Row>
        </div>
        <div class="contentbox">
            <Table
            	ref="selection" 
            	@on-selection-change="handleSelectionChange"
            	:columns="tableColumns" 
            	:data="tableData"
            ></Table>
            <div class="page">
                <Page :total="pageConfig.total" :current="pageConfig.currentPage" :page-size="pageConfig.pageSize" :page-size-opts="getPageSizePots" show-total show-elevator show-sizer @on-change="changePage" @on-page-size-change="changeSize"></Page>
            </div>
        </div>
        <Modal v-model="isShow" :title="modalTitle + '系统'" @on-visible-change="modelClose">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="120">
                <FormItem label="系统名称:" prop="name">
                    <Input type="text" v-model="formCustom.name" placeholder="请输入" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="系统简称:" prop="subName">
                    <Input type="text" v-model="formCustom.subName" placeholder="请输入" :maxlength="20"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="handleReset('formCustom')">取消</Button>
                <Button type="primary" size="large" @click="handleSubmit('formCustom')">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>

import RequestSystem from '@/api/module/system';

let searchConfig = {
        name: "", // 姓名
    };

export default {

    name: 'systemConfig',

    data() {
        const validateName = (rule, value, callback) => {
            var v = value.trim();
            if (v == "") {
                callback(new Error("系统名称不能为空"));
            } else {
                callback();
            }
        };
        const validateSubName = (rule, value, callback) => {
            var v = value.trim();
            if (v == "") {
                callback(new Error("系统简称不能为空"));
            } else {
                callback();
            }
        };
        return {
            // 搜索框配置
            searchConfig: Object.assign({}, searchConfig),
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
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: "名称",
                    key: "name",
                    align: "center"
                },
                {
                    title: "系统简称",
                    key: "subName",
                    align: "center"
                },
                {
                    title: "系统ID",
                    key: "systemId",
                    align: "center"
                },
                {
                    title: "操作",
                    key: "operate",
                    fixed: 'right',
                    width: 150,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button", {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        color: "#1890FF"
                                    },
                                    on: {
                                        click: () => {
                                            this.editItem(params.row);
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            h(
                                "Button", {
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
            tableData: [
            	{name: '就啊即可', subName: '是否', systemId: '2j14k141jk2j4k1'}
            ],
            // 选中项数组
            selection: [],
            //  搜索框中新增按钮出来弹框配置
            formCustom: {
                name: "", // 系统名称
                subName: "", // 系统简称
            },
            ruleCustom: {
                name: [{ validator: validateName, required: true, max: 20, trigger: "blur" }],
                subName: [{ validator: validateSubName, required: true, max: 20, trigger: "blur" }],
            },
            isShow: false, // 控制弹框是否显示
            modalTitle: "", // 弹框标题
        }
    },
    computed: {
        getPageSizePots: function() {
            return this.pageConfig.pageSizeOpts.map(value => {
                return value * 10;
            });
        },
    },
    mounted () {
    	this.getTableData();
    },
    methods: {
        // 得到表格数据
        async getTableData() {
            let searchData = Object.assign({}, this.searchConfig);
            for (let i in searchData) {
                if (i == "name") {
                    searchData[i] = searchData[i].trim();
                }
            }

            let params = {
            	...searchData,
            	currentPage: this.pageConfig.currentPage,
                pageSize: this.pageConfig.pageSize
            };

            let res = await RequestSystem.systemConfigFindList(params);
            let data = res.data;
            if (data.resultCode == "0") {
            	this.selection = [];
                this.tableData = data.data.list;
                this.pageConfig.total = data.data.total;
            } else {}
        },
        // 选中项变化
        handleSelectionChange (selection) {
        	this.selection = selection;
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
        // 表格编辑按钮
        editItem(obj) {
            this.formCustom = {
                name: obj.name,
                subName: obj.subName,
                systemId: obj.systemId,
            }
            this.isShow = true;
            this.modalTitle = "编辑";
        },
        // 数据删除接口
        async systemConfigDel (ids) {
        	let res = await RequestSystem.systemConfigDel({
        		ids: ids
        	});
        	let data = res.data;
        	if (data.resultCode == 0) {
        		this.querySearch();
        		this.$Message.error('删除成功');
        	}
        },
        // 表格删除按钮
        removeItem(obj) {
            this.$Modal.confirm({
                title: "提示",
                content: "确定删除该条数据?",
                onOk: () => {
                	this.systemConfigDel(obj.systemId);
                }
            });
        },
        // 搜索框查询按钮
        querySearch() {
            this.pageConfig.currentPage = 1;
            this.pageConfig.pageSize = 10;
            this.getTableData();
        },
        // 搜索框重置按钮
        resetSearch() {
            this.searchConfig = Object.assign({}, searchConfig);
            this.querySearch();
        },
        // 搜索框新增按钮
        addTable() {
            this.formCustom = {
                name: "",
                subName: "",
                systemId: "",
            }
            this.isShow = true;
            this.modalTitle = "新增";
        },
        // 搜索框删除按钮
        delTable() {
        	if (this.selection.length == 0) {
        		this.$Message.warning('请选择至少一条要删除的数据');
        		return;
        	} 
        	let result = [];
        	this.selection.forEach(item => {
        		result.push(item.systemId);
        	});
        	this.systemConfigDel(result.join());
        },
        // 新增或编辑接口
        async systemConfigEdit () {
            var formCustom = Object.assign({}, this.formCustom);
            for (var i in formCustom) {
                if (i == "name" || i == "mobile") {
                    formCustom[i] = formCustom[i].trim();
                }
            }
            let res = await RequestSystem.systemConfigEdit(formCustom);
            let data = res.data;
            if (data.resultCode == 0) {
            	this.querySearch();
                this.handleReset();
            } else {
            	this.$Message.error(data.result);
            }
        },
        // 弹出框内部确定按钮
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                	this.systemConfigEdit();
                } else {}
            });
        },
        // 弹出框内部取消按钮
        handleReset() {
            this.isShow = false;
        },
        modelClose(flag) {
            if (!flag) {
                this.$refs["formCustom"].resetFields();
            }
        }
    }
}
</script>
<style lang="less" scoped>
	.systemConfig {
		.page {
			padding: 10px 0;
			text-align: right;
		}
	}
</style>