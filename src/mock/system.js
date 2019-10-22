import Mock from 'mockjs'
import { portTransfer, param2Obj } from '@/utils'

const SystemList = []
const count = 100

for (let i = 0; i < count; i++) {
    SystemList.push(Mock.mock({
        name: '@ctitle(8, 10)',
        subName: '@cword(3, 5)',
        systemId: '@string("number", 8)' + '@string("upper", 5)' + '@string("number", 3)',
    }))
}

function systemConfigDel (id) {
    let index = SystemList.findIndex(item => item.systemId == id);
    if (index >= 0) {
        SystemList.splice(index, 1);
    }
}

export default {
    systemConfigFindList: config => {
        const { name, currentPage, pageSize } = JSON.parse(config.body);
        const mockNameList = SystemList.filter(item => {
            const lowerCaseName = item.name.toLowerCase()
            if (name && (lowerCaseName.indexOf(name.toLowerCase()) < 0)) return false
            return true
        });
        const newMockNameList = JSON.parse(JSON.stringify(mockNameList));
        const result = newMockNameList.splice((currentPage - 1) * pageSize, pageSize);
        return portTransfer({
            list: result,
            total: mockNameList.length
        }, '查询成功');
    },
    systemConfigEdit: config => {
        const { name, subName, systemId } = JSON.parse(config.body)
        let obj = null;
        if (systemId) {
            obj = SystemList.find(item => item.systemId == systemId);
            if (obj) {
                obj.name = name;
                obj.subName = subName;
            }
        } else {
            obj = {
                name: name,
                subName: subName,
                systemId: Mock.mock('@string("number", 8)' + '@string("upper", 5)' + '@string("number", 3)')
            }
            SystemList.push(obj);
        }
        return portTransfer(obj, systemId ? '编辑成功': '新增成功');
    },
    systemConfigDel: config => {
        const { ids } = param2Obj(config.url)
        let idArr = ids.split(',');
        if (idArr.length == 1) {
            systemConfigDel(idArr[0]);
        } else {
            idArr.forEach(item => systemConfigDel(item.systemId));
        }
        return portTransfer('删除成功', '删除成功');
    }
}