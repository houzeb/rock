// 系统配置相关

import RequestPC from '@/api/index';

import { 
	SYSTEM_CONFIG_GET_LIST,
	SYSTEM_CONFIG_EDIT,
	SYSTEM_CONFIG_DEL,
} from '@/api/rpath';

class RequestSystem extends RequestPC {
	constructor() {
		super()
		this.authOption = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
	}

	// 获取系统配置数据
	async systemConfigFindList (params) {
		return await this.post( SYSTEM_CONFIG_GET_LIST, params);
	}

	// 系统配置新增或编辑
	async systemConfigEdit (params) {
		return await this.post( SYSTEM_CONFIG_EDIT, params);
	}

	// 系统配置删除(单个或多个)
	async systemConfigDel (params) {
		return await this.get( SYSTEM_CONFIG_DEL, params);
	}
}

export default new RequestSystem();

