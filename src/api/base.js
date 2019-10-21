import axios from 'axios'

const SESSION_NAME = 'SESSIONID'

class RequestBase {
	constructor () {
		this.axios = axios.create()
		Object.assign(this.axios.defaults, {
			baseURL: '/s1',
			withCredentials: false,
			timeout: 30000,
		})
		this.axios.interceptors.response.use(
			this.__axiosResponseInterceptor.bind(this),
			this.__axiosResponseInterceptorError.bind(this)
		)
		this.axios.interceptors.request.use(
			this.__axiosRequestInterceptor.bind(this),
			this.__axiosRequestInterceptorError.bind(this)
		)
		this.defOption = {
			headers: {
				'Content-Type': 'application/json'
			},
			transformRequest: [function (data = {}, headers) {
				var __contentType = typeof headers['Content-Type'] === 'string' ? String(headers['Content-Type']).split(';')[0] : 'application/x-www-form-urlencoded'
				switch (__contentType) {
					case 'application/x-www-form-urlencoded':
						data = this.httpBuildRequest(data)
						break
					case 'application/json':
						if (Object.keys(data).length > 0) {
							data = JSON.stringify(data)
						} else {
							data = ''
						}
						break
					case 'multipart/form-data':
						break
				}
				return data
			}.bind(this)],
			transformResponse: [this.__transformResponse.bind(this)]
		}
		this.__sessionId = ''
	}
	__transformResponse (data) {
		return data;
	}

	__axiosResponseInterceptor (response) {
		// Do something with response data
		let __data = typeof response.data !== 'undefined' ? response.data : null;
		let __error = '接口请求失败';
		if (__data) {
			try {
				__data = JSON.parse(__data)
			} catch (e) {
				__error = '结果解析失败'
			}
			var __code = __data && typeof __data.code === 'number' ? __data.code : -1
			__error = __data && typeof __data.msg === 'string' ? __data.msg : __error
			if (__code >= 0) {
				return __data
			}
		}
		throw new Error(__error);
	}

	__axiosResponseInterceptorError (error) {
		// Do something with response error
		return Promise.reject(error)
	}

	__axiosRequestInterceptor (config) {
		// Do something before request is sent
		return config
	}

	__axiosRequestInterceptorError (error) {
		// Do something with request error
		return Promise.reject(error)
	}

	async getBySession (url, data = {}, option) {
		var __option = {}
		Object.assign(__option, this.defOption)
		Object.assign(__option, option)
		if (this.sessionId) {
			Object.assign(__option.headers, {
				[this.sessionName]: this.sessionId,
			})
		}
		__option.params = data
		return await this.axios.get(url, __option)
	}

	async postBySession (url, data = {}, option) {
		var __option = {}
		Object.assign(__option, this.defOption)
		Object.assign(__option, option)
		if (this.sessionId) {
			Object.assign(__option.headers, {
				[this.sessionName]: this.sessionId,
			})
		}
		return await this.axios.post(url, data, __option)
	}

	async get (url, data = {}, option) {
		var __option = {}
		Object.assign(__option, this.defOption)
		Object.assign(__option, option)
		__option.params = data
		return await this.axios.get(url, __option)
	}
	
	async post (url, data, option) {
		var __option = {}
		Object.assign(__option, this.defOption)
		Object.assign(__option, option)
		return await this.axios.post(url, data, __option)
	}
	async put (url, data, option) {
		var __option = {}
		Object.assign(__option, this.defOption)
		Object.assign(__option, option)
		return await this.axios.put(url, data, __option)
	}

	async upload (url, formData, option) {
		var __option = {}
		if (!(formData instanceof FormData)) {
			throw new Error('上传参数必须为formData')
		}
		Object.assign(__option, this.defOption, option, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return await this.axios.post(url, formData, __option)
	}

	async postFileBySession (url, data, option = {}) {
		if (data instanceof FormData) {
			var __option = {}
			Object.assign(__option, this.defOption)
			Object.assign(__option, {
				headers: {
					'Content-Type': 'multipart/form-data',
				}
			})
			Object.assign(__option, option)
			if (this.sessionId) {
				Object.assign(__option.headers, {
					[this.sessionName]: this.sessionId,
				})
			}
			return await this.axios.post(url, data, __option)
		}
		throw new Error('上传数据格式不是formData')
	}

	httpBuildRequest (params) {
		var __arr = []
		for (var __key in params) {
			var __val = params[__key]
			__val = encodeURIComponent(__val + '')
			__arr.push(`${__key}=${__val}`)
		}
		return __arr.join('&')
	}

	get sessionName () {
		return SESSION_NAME
	}

	set sessionId (value) {
		this.__sessionId = value
	}

	get sessionId () {
		return this.__sessionId
	}
}

export default RequestBase
