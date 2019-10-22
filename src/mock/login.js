import { body2Obj, param2Obj } from '@/utils'

const userMap = {
    [15083009710]: {
        id: 1,
        name: '侯振兵',
        password: '123456',
        account: '15083009710',
        remark: '该用户很懒，没有任何说明'
    }
}

export default {
    loginByUsername: config => {
        console.log(config)
        const { account, password } = body2Obj(config.body);
        let result = userMap[account] || {};
        if (result.id) {
            if (account == result.account && password == result.password) {
                let params = Object.assign({}, result);
                delete params.password;
                return {
                    code: 1,
                    msg: '成功',
                    data: {
                        resultCode: 0,
                        result: '登录成功',
                        data: params
                    }
                };
            }
        }
        return {};
    },
    getUserInfo: config => {
        const { token } = param2Obj(config.url)
        if (userMap[token]) {
            return userMap[token]
        } else {
            return false
        }
    },
    logout: () => 'success'
}