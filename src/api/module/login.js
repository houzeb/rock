// 登录相关
import RequestPC from '../index';

import { 
	LOGIN,
} from '@/api/rootPath';

class RequestLogin extends RequestPC {
	constructor() {
		super()
		this.authOption = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
	}

	// 合并公共参数
	merge(params) {
		return Object.assign({
			systemId: localStorage.getItem('SYSTEMID'),
			organizationId: localStorage.getItem('ORGANIZATIONID'),
			sessionId: localStorage.getItem('SESSIONID')
		}, params)
	}

	async Login (params) {
		return await this.post(LOGIN, params, this.authOption)
	}
}